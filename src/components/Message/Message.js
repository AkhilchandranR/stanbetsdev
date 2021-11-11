import React,{ useState } from 'react';
import './Message.css';
import StarIcon from '@mui/icons-material/Star';
import UserStatsModal from '../../Modals/UserStatsModal/UserStatsModal';
import { useSelector,useDispatch } from 'react-redux';
import { openStats,setChatUser } from '../../States/slices/userSlice';

function Message({alternate,id,username,usermessage,userId,isAdmin,isAnAdmin,isMuted}) {
    const dispatch = useDispatch();
    const[openUserStats,setOpenUserStats] = useState(false);
    const showStatsModal = useSelector((state)=>state.user.openStatsModal);

    //opens the userstats view and sets the id for pulling the 
    //data of user stats using setchatuser....
    const handleClick = (e)=>{
        e.preventDefault();
        dispatch(setChatUser({
            chatUserId: userId
        }));
        dispatch(openStats());
    }
    
    return (
        <>
        <div className={`message ${alternate && "message__alternate"}`}
        onClick={handleClick}>
            <span className="message__admin">
                    { isAdmin && 
                    <>
                        <StarIcon/> MOD
                    </>
                    }
                    <span>{username}: <span className="message__message">{usermessage}</span></span>
            </span>
        </div>
        <UserStatsModal  isAnAdmin={isAnAdmin} isMuted={isMuted}/>
        </>
    )
}

export default Message
