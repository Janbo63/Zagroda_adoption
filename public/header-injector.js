(function() {
    // Styles for the injected header
    const styles = `
      .injected-header {
        background-color: #166534;
        color: white;
        padding: 1rem;
        font-family: 'Inter', sans-serif;
      }
      .injected-header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
      }
      .injected-header-logo {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: white;
      }
      .injected-header-logo img {
        width: 40px;
        height: 40px;
        margin-right: 0.5rem;
      }
      .injected-header-nav {
        display: flex;
        gap: 1rem;
      }
      .injected-header-nav a {
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        transition: background-color 0.3s;
      }
      .injected-header-nav a:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    `;
  
    // Create and inject the style element
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  
    // Create the header HTML
    const headerHTML = `
      <div class="injected-header">
        <div class="injected-header-content">
          <a href="https://zagrodaalpakoterapii.com" class="injected-header-logo">
            <img src="https://zagrodaalpakoterapii.com/images/zagrodalogo.png" alt="Zagroda Alpakoterapii Logo">
            <span>Zagroda Alpakoterapii</span>
          </a>
          <nav class="injected-header-nav">
            <a href="https://zagrodaalpakoterapii.com">Home</a>
            <a href="https://zagrodaalpakoterapii.com/animals">Animals</a>
            <a href="https://zagrodaalpakoterapii.com/stay">Stay</a>
            <a href="https://zagrodaalpakoterapii.com/activities">Activities</a>
            <a href="https://zagrodaalpakoterapii.com/blog">Blog</a>
            <a href="https://zagrodaalpakoterapii.com/contact">Contact</a>
          </nav>
        </div>
      </div>
    `;
  
    // Create a container for the header
    const headerContainer = document.createElement('div');
    headerContainer.innerHTML = headerHTML;
  
    // Insert the header at the beginning of the body
    document.body.insertBefore(headerContainer, document.body.firstChild);
  })();