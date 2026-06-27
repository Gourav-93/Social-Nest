// profile.js - Profile and upload logic

document.addEventListener('DOMContentLoaded', () => {
    
    // Auth guard
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'auth.html';
        return;
    }

    const uploadForm = document.getElementById('uploadForm');
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadError = document.getElementById('uploadError');
    const uploadSuccess = document.getElementById('uploadSuccess');
    const postsSection = document.getElementById('postsSection');

    function showMessage(msg, type = 'error') {
        if (type === 'error') {
            uploadError.textContent = msg;
            uploadError.classList.remove('hidden');
            uploadSuccess.classList.add('hidden');
        } else {
            uploadSuccess.textContent = msg;
            uploadSuccess.classList.remove('hidden');
            uploadError.classList.add('hidden');
        }
    }

    function clearMessages() {
        uploadError.classList.add('hidden');
        uploadSuccess.classList.add('hidden');
    }

    // Upload Post Handler
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        clearMessages();
        uploadBtn.disabled = true;
        uploadBtn.textContent = 'Uploading...';

        const pic = document.getElementById('postImageUrl').value;
        const caption = document.getElementById('postCaption').value;

        const userObjStr = localStorage.getItem('user');
        let userId = null;
        if (userObjStr) {
            const userObj = JSON.parse(userObjStr);
            userId = userObj.id;
        }

        try {
            await window.api.uploadPost({ pic, caption, userId });
            
            showMessage('Post uploaded successfully!', 'success');
            uploadForm.reset();
            
            loadUserPosts();
            
        } catch (error) {
            showMessage(error.message || 'Failed to upload post.', 'error');
        } finally {
            uploadBtn.disabled = false;
            uploadBtn.textContent = 'Upload Post';
        }
    });

    async function loadUserPosts() {
        try {
            postsSection.innerHTML = '<div class="empty-state">Loading your posts...</div>';
            
            const posts = await window.api.fetchPosts();
            
            postsSection.innerHTML = '';

            if (!posts || posts.length === 0) {
                postsSection.innerHTML = '<div class="empty-state">No posts to display.</div>';
                return;
            }

            posts.forEach(post => {
                const postElement = document.createElement('article');
                postElement.className = 'post-card post-card-sm';
                
                const authorName = post.authorName || 'You';
                const userProfileImage = post.userProfileImage || 'https://via.placeholder.com/40';
                const datePosted = post.datePosted || new Date().toLocaleDateString();

                postElement.innerHTML = `
                    <header class="post-header">
                        <div class="post-header-left">
                            <img src="${userProfileImage}" alt="${authorName}'s avatar" class="post-avatar" onerror="this.src='https://placehold.co/40x40/eeeeee/31343c?text=U'" />
                            <div class="post-header-info">
                                <h3 class="post-author">${authorName}</h3>
                                <time class="post-date">${datePosted}</time>
                            </div>
                        </div>
                    </header>
                    <img
                        src="${post.pic || 'https://via.placeholder.com/400'}"
                        alt="Your Post Image"
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

                postsSection.appendChild(postElement);
            });

        } catch (error) {
            postsSection.innerHTML = '<div class="empty-state alert-error">Failed to load posts.</div>';
            console.error("Error loading posts:", error);
        }
    }

    loadUserPosts();
});
