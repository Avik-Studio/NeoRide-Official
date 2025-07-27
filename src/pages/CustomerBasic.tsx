export default function CustomerBasic() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, #dbeafe, white)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          Customer Dashboard - Basic Version
        </h1>
        
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>✅ Page is Working!</h2>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            This basic customer page is loading successfully. This means:
          </p>
          <ul style={{ color: '#6b7280', paddingLeft: '1.5rem' }}>
            <li>React Router is working</li>
            <li>The /customer route is accessible</li>
            <li>Components can render</li>
          </ul>
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Quick Actions</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => window.location.href = '/login'}
              style={{
                background: '#3b82f6',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Go to Login
            </button>
            <button 
              onClick={() => window.location.href = '/test'}
              style={{
                background: '#10b981',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Go to Test Page
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem('userType')
                window.location.href = '/login'
              }}
              style={{
                background: '#ef4444',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Clear Storage & Login
            </button>
          </div>
        </div>

        <div style={{
          background: '#f3f4f6',
          padding: '1rem',
          borderRadius: '6px',
          marginTop: '2rem'
        }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Debug Info:</h4>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Current URL: {window.location.href}
          </p>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            localStorage userType: {localStorage.getItem('userType') || 'Not set'}
          </p>
        </div>
      </div>
    </div>
  )
}