import React from 'react'
import fastLoading from '../assets/fastLoading.gif'
const PageNotFound = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(256, 256, 256, 0.1)',
            padding: '10px',
            borderRadius: '20px',
            backgroundImage: `url(${fastLoading})`,
            width: '100%',
            objectFit: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            margin: 'auto',
        }} >
            <div style={Window.innerWidth > 450 ? {
                color: 'rgb(0,67,77)',
                fontSize: '30px',
                fontWeight: 'bold',
                letterSpacing: '3px',
                display: "block",
                marginTop: '370px',
                zIndex: '1',
            } : {
                color: 'rgb(0,67,77)',
                fontSize: '20px',
                fontWeight: 'bold',
                letterSpacing: '3px',
                display: "block",
                marginTop: '370px',
                zIndex: '1',
            }}>Available in the next video</div>
        </div>
    );
}

export default PageNotFound