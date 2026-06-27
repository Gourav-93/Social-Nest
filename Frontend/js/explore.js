// explore.js - Explore feed logic

document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('ContentContainer');

    async function loadPosts() {
        try {
            contentContainer.innerHTML = '<div class="empty-state">Loading posts...</div>';
            
            const posts = await window.api.fetchPosts();
            
            contentContainer.innerHTML = '';

            if (!posts || posts.length === 0) {
                contentContainer.innerHTML = '<div class="empty-state">No posts available.</div>';
                return;
            }

            posts.forEach(post => {
                const postElement = document.createElement('article');
                postElement.className = 'post-card';
                
                const authorName = post.authorName || 'Anonymous'; 
                const datePosted = post.datePosted || new Date().toLocaleDateString();

                postElement.innerHTML = `
                    <header class="post-header">
                        <h3 class="post-author">${authorName}</h3>
                        <time class="post-date">${datePosted}</time>
                    </header>
                    <img
                        src="${post.pic || 'https://via.placeholder.com/400'}"
                        alt="Post by ${authorName}"
                        class="post-image"
                    />
                    <div class="post-body">
                        <p>${post.caption || ''}</p>
                    </div>
                `;

                // Handle image error gracefully
                const img = postElement.querySelector('img');
                img.addEventListener('error', function() {
                    this.src = 'https://placehold.co/400x400/eeeeee/31343c?text=Image+Not+Found';
                }, { once: true });

                contentContainer.appendChild(postElement);
            });
            
        } catch (error) {
            contentContainer.innerHTML = '<div class="empty-state alert-error">Failed to load posts. Please try again later.</div>';
            console.error("Error loading posts:", error);
        }
    }

    loadPosts();
});
