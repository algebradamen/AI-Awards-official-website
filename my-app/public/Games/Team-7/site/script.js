// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    if (navLinks.length > 0) {
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Intersection Observer for fade-in animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll('.about-card, .video-box, .video-box-large, .tip-item');
        if (animateElements.length > 0) {
            animateElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
    }

    // Video upload functionality with permanent storage
    const videoFileInput = document.getElementById('videoFileInput');
    const videoFileInputSecondary = document.getElementById('videoFileInputSecondary');
    const videoPlayer = document.getElementById('mainVideo');
    const videoSource = document.getElementById('videoSource');
    const videoUploadOverlay = document.getElementById('videoUploadOverlay');

    // IndexedDB setup for permanent video storage
    const DB_NAME = 'VideoStorageDB';
    const DB_VERSION = 1;
    const STORE_NAME = 'videos';

    let db = null;

    // Initialize IndexedDB
    function initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => {
                console.error('IndexedDB error:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                db = request.result;
                resolve(db);
            };

            request.onupgradeneeded = (event) => {
                db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            };
        });
    }

    // Save video to IndexedDB
    function saveVideoToDB(file) {
        return new Promise((resolve, reject) => {
            if (!db) {
                initDB().then(() => {
                    saveVideoToDB(file).then(resolve).catch(reject);
                });
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const videoData = {
                    data: e.target.result,
                    type: file.type,
                    name: file.name,
                    size: file.size,
                    timestamp: Date.now()
                };

                const transaction = db.transaction([STORE_NAME], 'readwrite');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.put(videoData, 'mainVideo');

                request.onsuccess = () => {
                    console.log('Video saved to IndexedDB');
                    resolve(videoData);
                };

                request.onerror = () => {
                    console.error('Error saving video:', request.error);
                    reject(request.error);
                };
            };

            reader.onerror = () => {
                reject(reader.error);
            };

            reader.readAsArrayBuffer(file);
        });
    }

    // Load video from IndexedDB
    function loadVideoFromDB() {
        return new Promise((resolve, reject) => {
            if (!db) {
                initDB().then(() => {
                    loadVideoFromDB().then(resolve).catch(reject);
                });
                return;
            }

            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get('mainVideo');

            request.onsuccess = () => {
                const videoData = request.result;
                if (videoData) {
                    resolve(videoData);
                } else {
                    resolve(null);
                }
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    // Display video from blob
    function displayVideo(videoData) {
        if (!videoData) return;

        // Revoke old URL if exists
        if (videoSource.src) {
            URL.revokeObjectURL(videoSource.src);
        }

        const blob = new Blob([videoData.data], { type: videoData.type });
        const videoUrl = URL.createObjectURL(blob);
        
        videoSource.src = videoUrl;
        videoPlayer.load();
        videoPlayer.classList.add('loaded');
        videoUploadOverlay.classList.add('hidden');
        updateVideoUI(true);
    }

    // Handle file input change
    async function handleVideoUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Check if file is a video
        if (!file.type.startsWith('video/')) {
            alert('Vennligst velg en video-fil (MP4, WebM, eller OGG)');
            return;
        }

        // Show loading message
        const uploadContent = videoUploadOverlay.querySelector('.upload-content');
        const originalContent = uploadContent.innerHTML;
        uploadContent.innerHTML = '<div class="upload-icon">⏳</div><p>Laster opp video...</p>';

        try {
            // Save video to IndexedDB
            await saveVideoToDB(file);
            
            // Display the video
            const videoData = await loadVideoFromDB();
            if (videoData) {
                displayVideo(videoData);
                updateVideoUI(true);
            }
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('Det oppstod en feil ved opplasting av videoen. Vennligst prøv igjen.');
            uploadContent.innerHTML = originalContent;
        }

        // Reset file input
        event.target.value = '';
    }

    // Load saved video on page load
    async function loadSavedVideo() {
        try {
            await initDB();
            const videoData = await loadVideoFromDB();
            if (videoData) {
                displayVideo(videoData);
            }
        } catch (error) {
            console.error('Error loading saved video:', error);
        }
    }

    // Delete video function
    async function deleteVideo() {
        if (!confirm('Er du sikker på at du vil slette videoen?')) {
            return;
        }

        try {
            if (!db) {
                await initDB();
            }

            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete('mainVideo');

            request.onsuccess = () => {
                // Revoke blob URL
                if (videoSource.src) {
                    URL.revokeObjectURL(videoSource.src);
                }
                
                // Reset video player
                videoSource.src = '';
                videoPlayer.load();
                videoPlayer.classList.remove('loaded');
                videoUploadOverlay.classList.remove('hidden');
                
                // Hide delete button
                const deleteBtn = document.getElementById('deleteVideoBtn');
                if (deleteBtn) {
                    deleteBtn.style.display = 'none';
                }

                console.log('Video deleted from IndexedDB');
            };

            request.onerror = () => {
                console.error('Error deleting video:', request.error);
                alert('Det oppstod en feil ved sletting av videoen.');
            };
        } catch (error) {
            console.error('Error deleting video:', error);
            alert('Det oppstod en feil ved sletting av videoen.');
        }
    }

    // Update UI when video is loaded
    function updateVideoUI(hasVideo) {
        const deleteBtn = document.getElementById('deleteVideoBtn');
        if (deleteBtn) {
            deleteBtn.style.display = hasVideo ? 'inline-block' : 'none';
        }
    }

    // Initialize on page load
    if (videoPlayer && videoSource && videoUploadOverlay) {
        loadSavedVideo().then(() => {
            // Check if video was loaded
            const hasVideo = videoSource.src && videoSource.src !== '';
            updateVideoUI(hasVideo);
        });

        // Event listeners for file inputs
        if (videoFileInput) {
            videoFileInput.addEventListener('change', handleVideoUpload);
        }

        if (videoFileInputSecondary) {
            videoFileInputSecondary.addEventListener('change', async (event) => {
                await handleVideoUpload(event);
                updateVideoUI(true);
            });
        }

        // Delete button event listener
        const deleteBtn = document.getElementById('deleteVideoBtn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', deleteVideo);
        }

        // Handle video error
        videoPlayer.addEventListener('error', function() {
            alert('Det oppstod en feil ved lasting av videoen. Vennligst prøv en annen fil.');
        });

        // Show overlay again if video source is removed
        videoPlayer.addEventListener('emptied', function() {
            if (!videoSource.src) {
                videoPlayer.classList.remove('loaded');
                videoUploadOverlay.classList.remove('hidden');
                updateVideoUI(false);
            }
        });
    }

    // CTA Button click handler
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const tipsSection = document.querySelector('#tips');
            if (tipsSection) {
                tipsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }

    // Add dynamic year to footer
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        const year = new Date().getFullYear();
        footerText.textContent = footerText.textContent.replace('2025', year);
    }
});

