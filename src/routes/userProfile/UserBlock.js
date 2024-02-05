import React, { Component } from 'react';

class UserBlock extends Component {
    render() {
        return (
            <div className="profile-top mb-10">
                <img src={require('Assets/img/profile-bg.jpg')} alt="profile banner" className="img-fluid" width="1920" height="345" />
                <div className="profile-content">
                    <div className="media" style={{alignItems:'center'}}>
                         <img src={require('Assets/avatars/profile.jpg')} alt="user profile" className="rounded-circle mr-30 bordered" width="80" height="80" /> 
                        <div className="media-body pt-5">
                            <div className="mb-10">
                            <h2>{localStorage.getItem("username")}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserBlock;
