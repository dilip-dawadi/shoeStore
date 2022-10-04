import React from 'react';
// import components
import Product from './Product';
import commingSoon from '../assets/commingsoon.gif';

const ProductList = () => {
  React.useEffect(() => {
    function getAllClients() {
      const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InphbnplcmRhd2FkaTEyM0BnbWFpbC5jb20iLCJpZCI6IjYyZTdlOGEyYTIxNTFmNjcxNmFhMTA4NSIsInJvbGUiOjAsImlhdCI6MTY2MjQwNTA5OCwiZXhwIjoxNjYyNDkxNDk4fQ.tJLND7c576E132ohaGwiObamDk4ur7vedvKhPIJ2pS0'
      });

      return fetch(`${process.env.REACT_APP_BASE_URL}shoesPage?page=1&limit=4&sort=-createdAt&tags=none&title[regex]=none`, {
        method: 'GET',
        headers: myHeaders,
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Something went wrong on api server!');
          }
        })
        .then(response => {
          setData(response.foodPageData);

        }).catch(error => {
          console.error(error);
        });
    }
    getAllClients();
  }, []);
  const [data, setData] = React.useState([]);
  if (data.length === 0) {
    return (
      <div style={{
        padding: '0px',
        margin: '0px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(256, 256, 256, 0.1)',
          padding: '10px',
          borderRadius: '20px',
          backgroundImage: `url(${commingSoon})`,
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
          }}>Loading, please wait...</div>
        </div>
      </div>
    );
  }

  if (data.length < 1) {
    return (
      <div className='text-center text-3xl text-gray-400 mt-48'>
        Sorry, nothing was found.
      </div>
    );
  }

  return (
    <section className='mb-20'>
      <div className='container mx-auto'>
        <div className="relative">
          <div style={{
            position: "absolute",
            content: "",
            width: "40px",
            height: "1px",
            background: "#f53737",
            top: "-16px",
            left: "50%",
            transform: "translate(-50%)",
            marginLeft: "-10px",
          }}></div>
          <div
            className='text-center text-4xl font-medium text-black mb-2'
          >Our Products</div>
          <div
            className='text-center
          text-gray-700 mb-7 text-lg font-light max-w-2xl mx-auto italic'
          >Add our products to weekly lineup</div>
          <div style={{
            position: "absolute",
            content: "",
            width: "40px",
            height: "1px",
            background: "#f53737",
            // bottom: "6px",
            top: "-24px",
            zIndex: 1000,
            left: "50%",
            transform: "translate(-50%)",
          }}></div>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10'>
          {data.slice().reverse().map((Products, index) => {
            return (
              <Product Products={Products} key={index} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
