extends CharacterBody2D

# --- NYE, ENKLERE INNSTILLINGER ---
@export var speed = 100.0       
@export var jump_power = 250.0 
@export var damage = 10 

var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")
var is_attacking = false

# --- HELSE (Nytt) ---
var health = 100

@onready var sprite = $AnimatedSprite2D 
@onready var attack_area = $AttackArea 

func _physics_process(delta: float) -> void:
	# 1. Tyngdekraft
	if not is_on_floor():
		velocity.y += gravity * delta

	# 2. Hopp (MED LIM-FIKS)
	if Input.is_action_just_pressed("jump") and is_on_floor() and not is_attacking:
		velocity.y = -jump_power 
		floor_snap_length = 0.0 
	else:
		floor_snap_length = 32.0 
		
	# 3. Angrep
	if Input.is_action_just_pressed("attack") and is_on_floor() and not is_attacking:
		start_attack()

	# 4. Bevegelse
	if is_attacking:
		velocity.x = move_toward(velocity.x, 0, speed)
	else:
		var direction = Input.get_axis("move_left", "move_right")
		if direction:
			velocity.x = direction * speed
			update_facing_direction(direction)
		else:
			velocity.x = move_toward(velocity.x, 0, speed)

	move_and_slide()
	
	# 5. Animasjoner
	update_animations()

# --- HJELPEFUNKSJONER ---

func update_facing_direction(dir):
	if dir > 0:
		sprite.flip_h = false
		attack_area.scale.x = 1 
	elif dir < 0:
		sprite.flip_h = true
		attack_area.scale.x = -1 

func update_animations():
	if is_attacking:
		if sprite.animation != "punch":
			sprite.play("punch")
		return

	if not is_on_floor() and velocity.y < -100:
		sprite.play("jump")
	elif velocity.x != 0:
		sprite.play("walk")
	else:
		sprite.play("idle")

func start_attack():
	is_attacking = true
	sprite.play("punch")
	perform_attack_logic()
	await sprite.animation_finished
	is_attacking = false

func perform_attack_logic():
	var targets = attack_area.get_overlapping_bodies()
	for body in targets:
		if body.has_method("take_damage"):
			body.take_damage(damage)

# --- NYTT: HELSE OG DØD ---
# Dette er funksjonen fienden (Arbeider) leter etter når han slår deg!
func take_damage(amount):
	health -= amount
	print("Au! Spiller ble slått. Helse igjen: ", health)
	
	# Her kan du legge inn en "hurt"-lyd eller blinke rødt
	
	if health <= 0:
		die()

func die():
	print("Spiller døde! Starter på nytt...")
	# Starter scenen (brettet) på nytt
	get_tree().reload_current_scene()
