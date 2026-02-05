extends CharacterBody2D

# --- INNSTILLINGER ---
@export var SPEED: int = 50
@export var CHASE_SPEED: int = 100 
@export var PATROL_DISTANCE: int = 125
@export var ATTACK_RANGE: int = 40 
@export var DAMAGE: int = 10
@export var HEALTH: int = 30

# VIKTIG: Dra Spiller-noden inn her i Inspector!
@export var player: CharacterBody2D 

# --- NODER ---
@onready var sprite: AnimatedSprite2D = $Sprite
@onready var ray_cast: RayCast2D = $Sprite/RayCast2D 

# --- TILSTANDER ---
enum States { PATROL, CHASE, ATTACK }
var current_state = States.PATROL

# --- VARIABLER ---
var gravity: float = ProjectSettings.get_setting("physics/2d/default_gravity")
var direction: Vector2 = Vector2.RIGHT 
var start_position_x: float
var can_attack = true

func _ready():
	start_position_x = position.x
	sprite.play("run") 
	
	ray_cast.enabled = true
	ray_cast.exclude_parent = true 
	
	# --- NYTT: IGNORER AREAS ---
	# Dette tvinger øynene til å overse AttackArea (sverdet) til spilleren,
	# og se rett på kroppen hans i stedet.
	ray_cast.collide_with_areas = false
	ray_cast.collide_with_bodies = true

func _physics_process(delta: float) -> void:
	if not is_on_floor():
		velocity.y += gravity * delta

	match current_state:
		States.PATROL:
			logic_patrol()
		States.CHASE:
			logic_chase()
		States.ATTACK:
			logic_attack()

	move_and_slide()
	update_direction_visuals()

# --- LOGIKK ---

func logic_patrol():
	velocity.x = direction.x * SPEED
	
	if position.x > start_position_x + PATROL_DISTANCE:
		direction = Vector2.LEFT
	elif position.x < start_position_x - PATROL_DISTANCE:
		direction = Vector2.RIGHT

	look_for_player()

func logic_chase():
	var direction_to_player = (player.global_position - global_position).normalized()
	
	if direction_to_player.x > 0:
		direction = Vector2.RIGHT
	else:
		direction = Vector2.LEFT
		
	velocity.x = direction.x * CHASE_SPEED
	
	var dist = global_position.distance_to(player.global_position)
	if dist < ATTACK_RANGE and can_attack:
		start_attack()

func logic_attack():
	velocity.x = 0

# --- SIKT MED DEBUG ---

func look_for_player():
	if ray_cast.is_colliding():
		var collider = ray_cast.get_collider()
		
		# --- SLADREHANK PÅ ---
		# Sjekk Output-vinduet nå! Hva står det her når streken er rød?
		# Det skal stå "Player". Hvis det står "AttackArea", vet vi feilen.
		print("RayCast treffer: ", collider.name) 
		
		if collider == player:
			current_state = States.CHASE
			print("!!! ARBEIDER SER SPILLEREN !!!")
		else:
			pass
	else:
		pass

func start_attack():
	current_state = States.ATTACK
	can_attack = false
	print("Arbeider angriper!")
	sprite.play("punch") 
	
	await get_tree().create_timer(0.2).timeout
	
	if global_position.distance_to(player.global_position) < ATTACK_RANGE + 10:
		if player.has_method("take_damage"):
			player.take_damage(DAMAGE)
	
	await sprite.animation_finished
	
	current_state = States.CHASE
	sprite.play("run")
	
	await get_tree().create_timer(1.0).timeout
	can_attack = true

func update_direction_visuals():
	# HAR ØKT LENGDEN HER FRA 100 TIL 200:
	if direction == Vector2.RIGHT:
		ray_cast.target_position.x = 200 
	else:
		ray_cast.target_position.x = -200 

	if direction.x > 0: 
		sprite.flip_h = true 
	elif direction.x < 0: 
		sprite.flip_h = false 

func take_damage(amount):
	HEALTH -= amount
	sprite.modulate = Color(1, 0, 0)
	await get_tree().create_timer(0.1).timeout
	sprite.modulate = Color(1, 1, 1)
	
	if HEALTH <= 0:
		die()

func die():
	queue_free()
