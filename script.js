document.addEventListener('DOMContentLoaded', function() {
    const heartsContainer = document.querySelector('.hearts-container');
    const weddingCard = document.querySelector('.wedding-card');
    let windowWidth = window.innerWidth;
    
    // Try to play music on user interaction
    function playMusic() {
        // Get the iframe
        const iframe = document.querySelector('.youtube-player iframe');
        
        // Reload the iframe to trigger autoplay
        if (iframe) {
            const src = iframe.src;
            iframe.src = src;
        }
        
        // Remove the event listeners after first interaction
        document.removeEventListener('click', playMusic);
        document.removeEventListener('touchstart', playMusic);
    }
    
    // Add event listeners for user interaction
    document.addEventListener('click', playMusic);
    document.addEventListener('touchstart', playMusic);
    
    // Typing animation for text
    function typeWriterEffect() {
        const messageParagraphs = document.querySelectorAll('.message p');
        const wishesParagraphs = document.querySelectorAll('.wishes p');
        const allParagraphs = [...messageParagraphs, ...wishesParagraphs];
        
        // Create cursor element
        const cursor = document.createElement('span');
        cursor.classList.add('typing-cursor');
        
        // Hide all paragraphs initially
        allParagraphs.forEach(paragraph => {
            const originalText = paragraph.textContent;
            paragraph.textContent = '';
            paragraph.style.visibility = 'visible';
            paragraph.dataset.originalText = originalText;
        });
        
        // Type each paragraph sequentially
        let currentParagraphIndex = 0;
        
        function typeParagraph(paragraph, text, index = 0) {
            // Add cursor to current paragraph
            if (!paragraph.querySelector('.typing-cursor')) {
                paragraph.appendChild(cursor);
            }
            
            if (index < text.length) {
                paragraph.insertBefore(document.createTextNode(text.charAt(index)), cursor);
                setTimeout(() => typeParagraph(paragraph, text, index + 1), 50); // Adjust speed here
            } else {
                // Move to next paragraph after a delay
                currentParagraphIndex++;
                if (currentParagraphIndex < allParagraphs.length) {
                    setTimeout(() => {
                        // Move cursor to next paragraph
                        paragraph.removeChild(cursor);
                        const nextParagraph = allParagraphs[currentParagraphIndex];
                        typeParagraph(nextParagraph, nextParagraph.dataset.originalText);
                    }, 500); // Delay between paragraphs
                }
            }
        }
        
        // Start typing the first paragraph
        if (allParagraphs.length > 0) {
            const firstParagraph = allParagraphs[0];
            typeParagraph(firstParagraph, firstParagraph.dataset.originalText);
        }
    }
    
    // Create hearts with enhanced features
    function createHearts() {
        // Create a new heart
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Random position across the entire width of the screen
        const positionX = Math.floor(Math.random() * windowWidth);
        heart.style.left = positionX + 'px';
        
        // Random size (now with possibility of larger hearts)
        const isLarge = Math.random() < 0.15; // Reduced from 20% to 15% chance of large heart
        const isSpecial = Math.random() < 0.3; // 30% chance of special effect
        // Removed rainbow effect
        
        if (isLarge) {
            heart.classList.add('large');
            
            // Make large hearts smaller (40px instead of 50px)
            const largeSize = 40;
            heart.style.width = largeSize + 'px';
            heart.style.height = largeSize + 'px';
            
            // Set the same size for pseudo-elements
            const style = document.createElement('style');
            const heartId = 'heart-large-' + Date.now() + Math.floor(Math.random() * 1000);
            heart.id = heartId;
            
            style.textContent = `
                #${heartId}:before, #${heartId}:after {
                    width: ${largeSize}px;
                    height: ${largeSize}px;
                }
                #${heartId}:before {
                    top: -${largeSize/2}px;
                }
                #${heartId}:after {
                    left: ${largeSize/2}px;
                }
            `;
            document.head.appendChild(style);
            
            // Only red color for all hearts
            heart.style.backgroundColor = '#ff0000';
            
            // Add special effects to large hearts (only spin or glow, no rainbow)
            if (isSpecial) {
                if (Math.random() < 0.5) {
                    heart.classList.add('glow');
                } else {
                    heart.classList.add('spin');
                }
            }
        } else {
            // Normal size hearts - reduced size range
            const size = Math.floor(Math.random() * 8) + 8; // 8px to 16px (reduced further)
            heart.style.width = size + 'px';
            heart.style.height = size + 'px';
            
            // Set the same size for pseudo-elements
            const style = document.createElement('style');
            const heartId = 'heart-' + Date.now() + Math.floor(Math.random() * 1000);
            heart.id = heartId;
            
            style.textContent = `
                #${heartId}:before, #${heartId}:after {
                    width: ${size}px;
                    height: ${size}px;
                }
                #${heartId}:before {
                    top: -${size/2}px;
                }
                #${heartId}:after {
                    left: ${size/2}px;
                }
            `;
            document.head.appendChild(style);
            
            // Only red color for all hearts
            heart.style.backgroundColor = '#ff0000';
            
            // Add special effects to some normal hearts (only spin or glow, no rainbow)
            if (isSpecial) {
                if (Math.random() < 0.5) {
                    heart.classList.add('glow');
                } else {
                    heart.classList.add('spin');
                }
            }
        }
        
        // Random animation duration
        const animationDuration = Math.floor(Math.random() * 5) + 15; // 15s to 20s (slower fall)
        heart.style.animationDuration = heart.classList.contains('spin') ? 
            `2s, ${animationDuration}s, 8s` : 
            (heart.classList.contains('glow') ? 
                `2s, ${animationDuration}s, 4s` : 
                `2s, ${animationDuration}s`);
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.5; // 0.5 to 1
        heart.style.opacity = opacity;
        
        // Add the same color to pseudo-elements
        if (!heart.classList.contains('large')) {
            const style = document.getElementById(heart.id + '-style') || document.createElement('style');
            style.id = heart.id + '-style';
            
            style.textContent += `
                #${heart.id}:before, #${heart.id}:after {
                    background-color: #ff0000;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to container
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            if (heart && heart.parentNode) {
                heart.remove();
            }
            if (!heart.classList.contains('large') && document.getElementById(heart.id + '-style')) {
                document.getElementById(heart.id + '-style').remove();
            }
        }, animationDuration * 1000);
    }
    
    // Create heart burst effect on click
    function createHeartBurst(x, y) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.classList.add('click-ripple');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        heartsContainer.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 800);
        
        // Create sparkles
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            
            // Position at click point with random offset
            const angle = (i / 8) * 360;
            const distance = Math.random() * 30 + 20;
            const sparkleX = x + Math.cos(angle * Math.PI / 180) * distance;
            const sparkleY = y + Math.sin(angle * Math.PI / 180) * distance;
            
            sparkle.style.left = sparkleX + 'px';
            sparkle.style.top = sparkleY + 'px';
            
            heartsContainer.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
        
        // Create multiple hearts in a burst pattern
        const burstCount = 6; // Reduced from 8 to 6
        
        for (let i = 0; i < burstCount; i++) {
            const burstHeart = document.createElement('div');
            burstHeart.classList.add('heart');
            
            // Random size for burst hearts - smaller now
            const size = Math.floor(Math.random() * 6) + 8; // 8px to 14px (reduced further)
            burstHeart.style.width = size + 'px';
            burstHeart.style.height = size + 'px';
            
            // Position at click point
            burstHeart.style.left = x + 'px';
            burstHeart.style.top = y + 'px';
            burstHeart.style.position = 'absolute';
            
            // Random angle for burst direction
            const angle = (i / burstCount) * 360;
            const distance = Math.random() * 50 + 30; // 30px to 80px (reduced from 40-100px)
            
            // Only red color for all burst hearts
            burstHeart.style.backgroundColor = '#ff0000';
            
            // Set unique ID for the burst heart
            const burstHeartId = 'burst-heart-' + Date.now() + i;
            burstHeart.id = burstHeartId;
            
            // Create style for pseudo-elements
            const burstStyle = document.createElement('style');
            
            burstStyle.textContent = `
                #${burstHeartId}:before, #${burstHeartId}:after {
                    background-color: #ff0000;
                    width: ${size}px;
                    height: ${size}px;
                }
            `;
            
            burstStyle.textContent += `
                #${burstHeartId}:before {
                    top: -${size/2}px;
                }
                #${burstHeartId}:after {
                    left: ${size/2}px;
                }
                
                @keyframes burstOut${i} {
                    0% {
                        transform: rotate(-45deg) scale(0.2);
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.8;
                    }
                    100% {
                        transform: rotate(-45deg) translate(${Math.cos(angle * Math.PI / 180) * distance}px, ${Math.sin(angle * Math.PI / 180) * distance}px) scale(0.5);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(burstStyle);
            
            // Apply burst animation
            burstHeart.style.animation = `burstOut${i} 1.5s forwards`;
            
            // Add to container
            heartsContainer.appendChild(burstHeart);
            
            // Remove after animation
            setTimeout(() => {
                if (burstHeart.parentNode) {
                    burstHeart.remove();
                }
                burstStyle.remove();
            }, 1500);
        }
    }
    
    // Add click event to create heart burst
    weddingCard.addEventListener('click', function(event) {
        const rect = weddingCard.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        createHeartBurst(x, y);
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        windowWidth = window.innerWidth;
    });
    
    // Create initial hearts - reduced number
    for (let i = 0; i < 4; i++) { // Reduced from 6 to 4
        setTimeout(() => {
            createHearts();
        }, i * 1000); // Increased delay between hearts from 800ms to 1000ms
    }
    
    // Create new hearts periodically - reduced frequency
    setInterval(createHearts, 4000); // Increased from 3000ms to 4000ms
    
    // Start the typing effect
    typeWriterEffect();
}); 