import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function Private({children}) {
    const {isAuthenticated, loading }=useSelector((state)=>state.auth)
    if (loading) {
        return <div>Loading...</div>;
      }
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default Private