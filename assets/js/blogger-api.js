document.addEventListener('DOMContentLoaded', function() {
    const blogContainer = document.getElementById('blog-posts');
    if (blogContainer) {
        fetchBlogPosts(blogContainer);
        
        //scroll event listener for infinite scrolling
        window.addEventListener('scroll', () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
                if (!blogContainer.getAttribute('data-loading') && blogContainer.getAttribute('data-next-page')) {
                    loadMorePosts(blogContainer, blogContainer.getAttribute('data-next-page'));
                }
            }
        });
    }
});

async function fetchBlogPosts(container) {
    container.setAttribute('data-loading', 'true');
    container.innerHTML = `<div class="loading-container">
        <div class="loading"><div></div><div></div><div></div><div></div></div>
        <p>Loading blog posts...</p>
    </div>`;
    
    const API_KEY = 'GITHUB_PLACEHOLDER1'; 
    const BLOG_ID = '1667669270318888298';
    const MAX_RESULTS = 10;
    
    try {
        const response = await fetch(
            `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=${MAX_RESULTS}&fetchImages=true&orderBy=published`
        );
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        container.innerHTML = '';
        
        if (data.items && data.items.length > 0) {
            data.items.forEach((post, index) => {
                container.appendChild(createPostElement(post, index));
            });
            
            if (data.nextPageToken) {
                container.setAttribute('data-next-page', data.nextPageToken);
            } else {
                container.removeAttribute('data-next-page');
            }
        } else {
            container.innerHTML = `<div class="no-posts">
                <h3>No blog posts found</h3>
                <p>Check back soon for new content!</p>
            </div>`;
        }
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        container.innerHTML = `<div class="error-container">
            <h3>Oops! Something went wrong</h3>
            <p>Could not load blog posts. Please try again later.</p>
            <button class="btn btn-primary retry-btn">Retry</button>
        </div>`;
        
        container.querySelector('.retry-btn')?.addEventListener('click', () => fetchBlogPosts(container));
    }
    
    container.removeAttribute('data-loading');
}

async function loadMorePosts(container, pageToken) {
    if (container.getAttribute('data-loading') === 'true') return;
    
    container.setAttribute('data-loading', 'true');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-container';
    loadingIndicator.innerHTML = `<div class="loading"><div></div><div></div><div></div><div></div></div>`;
    container.appendChild(loadingIndicator);
    
    const API_KEY = 'GITHUB_PLACEHOLDER1';
    const BLOG_ID = '1667669270318888298';
    const MAX_RESULTS = 10;
    
    try {
        const response = await fetch(
            `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=${MAX_RESULTS}&pageToken=${pageToken}&fetchImages=true&orderBy=published`
        );
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        loadingIndicator.remove();
        
        if (data.items && data.items.length > 0) {
            const currentPostCount = container.querySelectorAll('.blog-post').length;
            data.items.forEach((post, index) => {
                container.appendChild(createPostElement(post, currentPostCount + index));
            });
            
            if (data.nextPageToken) {
                container.setAttribute('data-next-page', data.nextPageToken);
            } else {
                container.removeAttribute('data-next-page');
            }
        }
    } catch (error) {
        console.error('Error loading more posts:', error);
        loadingIndicator.innerHTML = `<button class="btn btn-primary retry-btn">Retry Loading More</button>`;
        loadingIndicator.querySelector('.retry-btn')?.addEventListener('click', () => loadMorePosts(container, pageToken));
    }
    
    container.removeAttribute('data-loading');
}

function createPostElement(post, index) {
    let imageUrl = 'assets/img/blog-placeholder.jpg';
    if (post.images && post.images.length > 0) {
        imageUrl = post.images[0].url;
    } else {
        const imgMatch = post.content.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch && imgMatch[1]) imageUrl = imgMatch[1];
    }
    
    const publishDate = new Date(post.published);
    const formattedDate = publishDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    let excerpt = post.content.replace(/<[^>]*>/g, '');
    excerpt = excerpt.substring(0, 250) + (excerpt.length > 250 ? '...' : '');
    
    const postElement = document.createElement('article');
    postElement.className = 'blog-post fade-in';
    postElement.style.animationDelay = `${index * 0.1}s`;
    
    postElement.innerHTML = `
        <div class="blog-post-image">
            <img src="${imageUrl}" alt="${post.title}">
        </div>
        <div class="blog-post-content">
            <div class="blog-post-date">${formattedDate}</div>
            <h2>${post.title}</h2>
            <p>${excerpt}</p>
            <a href="${post.url}" class="btn btn-secondary" target="_blank">
                Read More
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;
    
    return postElement;
}
