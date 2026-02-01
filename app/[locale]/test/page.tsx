import { unstable_setRequestLocale } from 'next-intl/server'

export default function TestPage() {
    return (
        <div style={{
            padding: '100px',
            backgroundColor: 'red',
            color: 'white',
            fontSize: '50px',
            textAlign: 'center'
        }}>
            <h1>TEST ROUTE WORKING!</h1>
            <p>This is /test route</p>
        </div>
    )
}
