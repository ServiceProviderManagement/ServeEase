import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

function CardServiceProvider(props) {

  useEffect(() => {
    var roundRatings=Math.round(`${props.ratings}`)
    const radioElement = document.getElementById(`star${roundRatings}`);
    if (radioElement) {
      radioElement.checked = true;
    }
  }, [props.ratings]);
  return (
    <>
      <li className='cards__item'>
        <div>
          <Link className='cards__item__link' to={props.path}>
            <figure className='cards__item__pic-wrap' data-category={props.label}>
              <img className='cards__item__img'
                alt="ServeEase"//<img src='public\images\handyman.jpg'/>
                src={props.src} 
              />
            </figure>
            <div className='cards__item__info'>
            
              <h3>{props.name}</h3>
              <h5 className='cards__item__text'>{props.experties}</h5>
              {/* <h2>ratings:{props.ratings}</h2> */}
              <div className="rate" id="rating">
                <input type="radio" id="star5" name="rate" value="5" disabled/>
                <label htmlFor="star5" title="text">5 stars</label>
                <input type="radio" id="star4" name="rate" value="4" disabled/>
                <label htmlFor="star4" title="text">4 stars</label>
                <input type="radio" id="star3" name="rate" value="3" disabled/>
                <label htmlFor="star3" title="text" >3 stars</label>
                <input type="radio" id="star2" name="rate" value="2" disabled/>
                <label htmlFor="star2" title="text">2 stars</label>
                <input type="radio" id="star1" name="rate" value="1" disabled/>
                <label htmlFor="star1" title="text">1 star</label>
              </div>
              
            </div>
          </Link>
          <div className='add_app_btn'>
          {props.addAppointment}

          </div>
        </div>
        
      </li>
    </>
  );
}

export default CardServiceProvider;