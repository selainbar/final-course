import React from 'react'
import {Link} from'react-router-dom'
function NotFoundPage() {
  return <>
    <div>404 Not Found Page</div>
    <Link to='/'> return to log in page</Link>
</>
}

export default NotFoundPage