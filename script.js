document.addEventListener('DOMContentLoaded', function() {
    const heartsContainer = document.querySelector('.hearts-container');
    const containerWidth = heartsContainer.offsetWidth;
    
    // Typing animation for text
    function typeWriterEffect() {
        const messageParagraphs = document.querySelectorAll('.message p');
        const wishesParagraphs = document.querySelectorAll('.wishes p');
        const allParagraphs = [...messageParagraphs, ...wishesParagraphs];
        
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
            if (index < text.length) {
                paragraph.textContent += text.charAt(index);
                setTimeout(() => typeParagraph(paragraph, text, index + 1), 50); // Adjust speed here
            } else {
                // Move to next paragraph after a delay
                currentParagraphIndex++;
                if (currentParagraphIndex < allParagraphs.length) {
                    setTimeout(() => {
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
    
    // Create hearts
    function createHearts() {
        // Create a new heart
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Random position
        const positionX = Math.floor(Math.random() * (containerWidth - 30));
        heart.style.left = positionX + 'px';
        
        // Random size
        const size = Math.floor(Math.random() * 15) + 15; // 15px to 30px
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
        
        // Random animation duration
        const animationDuration = Math.floor(Math.random() * 5) + 10; // 10s to 15s
        heart.style.animationDuration = `2s, ${animationDuration}s`;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.5; // 0.5 to 1
        heart.style.opacity = opacity;
        
        // Random color variations
        const hue = Math.floor(Math.random() * 20) - 10; // -10 to 10
        const color = `hsl(${350 + hue}, 100%, 70%)`;
        heart.style.backgroundColor = color;
        
        style.textContent += `
            #${heartId}:before, #${heartId}:after {
                background-color: ${color};
            }
        `;
        
        // Add to container
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
            style.remove();
        }, animationDuration * 1000);
    }
    
    // Create initial hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createHearts();
        }, i * 300);
    }
    
    // Create new hearts periodically
    setInterval(createHearts, 800);
    
    // Add floating animation to the rings
    const rings = document.querySelectorAll('.ring');
    rings.forEach((ring, index) => {
        ring.style.animation = `float ${2 + index * 0.5}s ease-in-out infinite alternate`;
    });
    
    // Add floating animation keyframes
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(${rings[0].style.transform ? '10px' : '-10px'});
            }
            100% {
                transform: translateY(-10px) translateX(${rings[0].style.transform ? '10px' : '-10px'});
            }
        }
    `;
    document.head.appendChild(floatStyle);
    
    // Start the typing effect
    typeWriterEffect();
}); 