import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out our services!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/Painter.jpeg'
              text='Painting'
            //   label='Painter'
              path='/AllServiceProviders/?profession=painter'
            />
            <CardItem
              src='images/electrician.jpeg'
              text='Electrical'
            //   label='Electrical'
              path='/services'
            />
               <CardItem
              src='images/plumber.jpg'
              text='Plumbing'
            //   label='Electrical'
              path='/services'
            />
            <CardItem
              src='images/carpenter.jpeg'
              text='Carpenter'
            //   label='Electrical'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/Salon.jpeg'
              text='Salon Servies'
            //   label='Mystery'
            path='/AllServiceProviders/?profession=Salon'
            />
            <CardItem
              src='images/pest_control.jpeg'
              text='Experience Football on Top of the Himilayan Mountains'
            //   label='Adventure'
              path='/services'
            />
            <CardItem
              src='images/mason.jpeg'
              text='Ride through the Sahara Desert on a guided camel tour'
            //   label='Adrenaline'
              path='/services'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;