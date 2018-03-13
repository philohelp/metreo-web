import React, { Component } from 'react';
import Slider from 'react-slick';
import { Image } from 'semantic-ui-react'

class Carousel extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        // certain condition here, perhaps comparison between this.props and nextProps
        // and if you want to update slider on setState in parent of this, return true, otherwise return false
        if (this.props.updateCount !== nextProps.updateCount) {
            return false
        }
        return true
    }

    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 6000,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
        };
        return (
            <Slider ref={slider => this.slider = slider} {...settings}>
                <div><Image src={require("./../img/feature/iphone1.png")} alt="La page d'accueil" /></div>
                <div><Image src={require("./../img/feature/iphone2.png")} alt="La gestion des paquets" /></div>
                <div><Image src={require("./../img/feature/iphone3.png")} alt="Stats et personnalisation" /></div>
                <div><Image src={require("./../img/feature/iphone4.png")} alt="La liste des paquets" /></div>
                <div><Image src={require("./../img/feature/iphone5.png")} alt="La gestion des paquets" /></div>
                <div><Image src={require("./../img/feature/iphone6.png")} alt="Stats et personnalisation" /></div>
                <div><Image src={require("./../img/feature/iphone7.png")} alt="La page d'accueil" /></div>
                <div><Image src={require("./../img/feature/iphone8.png")} alt="La gestion des paquets" /></div>
            </Slider>
        )
    }
}

export default Carousel;