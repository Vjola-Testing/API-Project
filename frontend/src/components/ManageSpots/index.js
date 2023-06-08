import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {getUserSpotsThunk} from '../../store/spot'
import './ManageSpots.css'
import OpenModalButton from '../OpenModalButton'
import DeleteSpotModal from '../DeleteSpotModal'


export default function ManageSpots () {
    const dispatch = useDispatch();
	const spots = useSelector(state => state.spot.allSpots)
    console.log(spots)

    useEffect(() => {
        dispatch(getUserSpotsThunk())
    }, [dispatch])

    return (
        <>
        {!spots ? <div className='manageSpotsHeader'>
                <div>Manage Spots</div>
                <Link to='/spots/new'>
                    <button className='addSpotButton'>Create a New Spot</button>
                </Link>
            </div>
            :
            <div className='manageSpotsHeader'>
                <div>Manage Spots</div>
                <Link to='/spots/new'>
                    <button className='addSpotButton'>Create a New Spot</button>
                </Link>
                <div className='spots-container'>
      {spots && spots.map(spot => (
        <Link to={`/spots/${spot.id}`} key={`spot-${spot.id}`}>
        <div className='spot'>
          <img src={spot.previewImage} alt="Spot Preview" />
          <h2>{spot.name}</h2>
          <p>City: {spot.city}, State: {spot.state}</p>
          <p>${spot.price} night</p>
          <div className='manageSpot-buttons'>
            <Link to={`/spots/${spot.id}/edit`}>
                <button id="updateButton">Update</button>
            </Link>
            <button id="deleteButton">
                <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteSpotModal spot={spot} />}
                />
            </button>
          </div>
        </div>
        </Link>
      ))}
    </div>
            </div>

            }
        </>
    )
}