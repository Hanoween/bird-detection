import { Link } from "react-router-dom";

const Home = () => {

    return (
        <div className="home">
            <title>Birdy</title>
            <div>
                <div className="banner">
                    <div className="navBar">
                        <div className="name">Birdy</div>

                        <ul>
                            <li><a href="#">Home</a></li>

                        </ul>
                    </div>

                    <div className="content">
                        <div className="large">____CURIOUS ABOUT BIRDS?___</div>
                        <div className="padding">Birdy is a bird recognition website that tells you all about their species </div>
                        <div>
                        <Link to="/upload"><button type="button"><span></span>EXPLORE</button> </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;