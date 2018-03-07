import React, { Component } from "react";

import "./../App.css";
import "./../css/responsive.css";
import "./../css/material-design-iconic-font.css"
import "./../css/animate.css";
import "./../css/animate-text.css";
import "./../css/nivo-slider.css";
import "./../css/slick.css";
import "./../css/font-awesome.min.css";
import "./../css/shortcode/default.css";
import "./../css/shortcode/header.css";
import "./../css/shortcode/slider.css";
import "./../css/shortcode/get-touch.css";
import "./../css/shortcode/app-benefits.css";
import "./../css/shortcode/feature.css";
import "./../css/shortcode/info.css";
import "./../css/shortcode/footer.css";

import logo2 from './../logo2.png';
import generic from "./../generic2.jpg";
import iphoneaplat from "./../img/showcase/iphoneaplat.png";

import Typist from "react-typist";
import {
    Row,
    Col,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators
} from "reactstrap";

import { firebase } from '../firebase';

import Navigation from "./Navigation";

const items = [
    {
        src: require("./../img/feature/iphone1.png"),
        altText: "La page d'accueil",
    },
    {
        src: require("./../img/feature/iphone2.png"),
        altText: "La gestion des paquets",
    },
    {
        src: require("./../img/feature/iphone3.png"),
        altText: "Stats et personnalisation",
    },
    {
        src: require("./../img/feature/iphone4.png"),
        altText: "La page d'accueil",
    },
    {
        src: require("./../img/feature/iphone5.png"),
        altText: "La gestion des paquets",
    },
    {
        src: require("./../img/feature/iphone6.png"),
        altText: "Stats et personnalisation",
    },
    {
        src: require("./../img/feature/iphone7.png"),
        altText: "La page d'accueil",
    },
    {
        src: require("./../img/feature/iphone8.png"),
        altText: "La gestion des paquets",
    }
];

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            authUser: null
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState(() => ({ authUser }))
                : this.setState(() => ({ authUser: null }));
        });
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img src={item.src} alt={item.altText} />
                </CarouselItem>
            );
        });
        return (
            <div className="bigCont">

                <div className="slider-area-5">
                    <div className="slider-img">
                        <img src={generic} alt="" />
                    </div>
                    <div className="slide1-text slide1-text-4 text-white">
                        <div className="middle-text">
                            <h2 className="clip is-full-width">
                                DES EVALUATIONS
					          <span className="cd-words-wrapper">
                                    <Typist>
                                        <b className="is-visible"> plus riches</b>
                                        <Typist.Backspace count={11} delay={200} />
                                        <Typist.Delay ms={500} />
                                        <b className="is-visible"> plus rapides</b>
                                        <Typist.Backspace count={12} delay={200} />
                                        <Typist.Delay ms={500} />
                                        <b className="is-visible"> plus fines</b>
                                        <Typist.Backspace count={10} delay={200} />
                                        <Typist.Delay ms={500} />
                                        <b className="is-visible"> mieux suivies</b>
                                        <Typist.Backspace count={14} delay={200} />
                                        <Typist.Delay ms={500} />
                                        <b className="is-visible"> plus riches</b>
                                    </Typist>
                                </span>
                            </h2>
                            <div className="cap-text">
                                {/* <p>Metreo est la première appli d'assistance à la correction pour les enseignants. Elle est disponible gratuitement pour ios et pour android.</p> */}
                                <p>Découvrez <b>Metreo</b>, <br />l'appli qui donnerait <i>presque</i> envie de corriger des copies.
                  <br />Disponible gratuitement pour ios et pour android.</p>
                            </div>
                            <div className="cap-readmore-5">
                                <a href="#download" className="white-btn">télécharger</a>
                                <a href="#project">en savoir plus</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Get-in-touch-area-start --> */}
                <div className="get-in-touch-area ptb-100" id="download">
                    <div className="container">
                        <Row>
                            <Col lg={{ size: 10, offset: 1 }} md={{ size: 10, offset: 1 }} sm="12" xs="12">
                                <div className="section-title text-center">
                                    <h2>Où trouver metreo ?</h2>
                                    <p>Vous pouvez retrouver Metreo dans les stores iTunes (si vous avez un iphone) ou Google Play (si vous utilisez android). <br /> La version standard est gratuite et elle le restera toujours.</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12" md="12" sm="12" xs="12">
                                <div className="download-app">
                                    <ul className="download-btn">
                                        <li>
                                            <a href="https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1351368910&mt=8">
                                                <span className="icon">
                                                    <i className="fa fa-apple"></i>
                                                </span>
                                                <span className="small">Télécharger</span>
                                                <span className="big">App Store</span>
                                            </a>
                                        </li>
                                        <li style={{ marginTop: 10 }}>
                                            <a href="https://play.google.com/store">
                                                <span className="icon">
                                                    <i className="fa fa-play store"></i>
                                                </span>
                                                <span className="small">Télécharger</span>
                                                <span className="big">google play</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                {/* <!-- Get-in-touch-area-end --> */}
                {/* <!-- showcase-area-start --> */}
                <div className="showcase-area nav-style-1 ptb-100 default-bg" id="project">
                    <div className="container">
                        <Row>
                            <Col lg={{ size: 10, offset: 1 }} md={{ size: 10, offset: 1 }} sm="12" xs="12">
                                <div className="section-title text-center">
                                    <h2>projet</h2>
                                    <p>
                                        Réalisée entièrement par un professeur de philosophie (au départ pour son propre usage), Metreo est la première application d'assistance à la correction à destination des enseignants. <br />Les professeurs  gagnent du temps et des informations et simplifient leur organisation. Les élèves profitent de rapports d'évaluation précis qui leur permettent de mieux comprendre leurs atouts, leurs faiblesses et leurs progrès au vu de ce qui est attendu d'eux.</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <div className="showcase-slider">
                                <div className="showcase-active">
                                    <Col lg="12">
                                        <div className="single-showcase">
                                            <img src={iphoneaplat} alt="" />
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </Row>
                    </div>
                </div>
                {/* <!-- showcase-area-end --> */}
                {/* <!-- creative-features-area-start --> */}
                <div className="creative-features-area ptb-100" id="features">
                    <div className="container">
                        <Row>
                            <Col lg={{ size: 10, offset: 1 }} md={{ size: 10, offset: 1 }} sm="12" xs="12">
                                <div className="section-title text-center">
                                    <h2>Caractéristiques</h2>
                                    <p>Metreo est aussi simple à prendre en main que riche en fonctionnalités.<br />Vous pouvez opter pour corriger une copie seule ou un paquet entier - et de conserver en mémoire les élèves, les sujets donnés et les copies corrigées, ce qui vous permet d'assurer un suivi sur la durée.</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="3" md="3" sm="3" xs="12">
                                <div className="single-creative-feature">
                                    <div className="creative-feature-icon">
                                        <i className="zmdi zmdi-edit"></i>
                                    </div>
                                    <div className="creative-feature-text">
                                        <h4>Aide à la correction</h4>
                                        <p>Metreo facilite et enrichit le travail de lecture des copies. On y passe un peu moins de temps et on en retire bien davantage.</p>
                                    </div>
                                </div>
                                <div className="single-creative-feature">
                                    <div className="creative-feature-icon">
                                        <i className="zmdi zmdi-arrow-split"></i>
                                    </div>
                                    <div className="creative-feature-text">
                                        <h4>Critères types</h4>
                                        <p>L'application est distribuée avec dix critères d'évaluation prédéfinis. Vous pouvez les conserver ou les remplacer par les vôtres.</p>
                                    </div>
                                </div>
                                <div className="single-creative-feature">
                                    <div className="creative-feature-icon">
                                        <i className="zmdi zmdi-comment-text"></i>
                                    </div>
                                    <div className="creative-feature-text">
                                        <h4>Commentaires types</h4>
                                        <p>L'application comprend une quarantaine de commentaires types, là encore modifiables et adaptables selon vos souhaits.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={{ size: 4, offset: 1 }} md={{ size: 4, offset: 1 }} sm="6" xs="12">
                                <div className="creative-feature-img">
                                    <Carousel
                                        activeIndex={activeIndex}
                                        next={this.next}
                                        previous={this.previous}
                                    >
                                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                                        {slides}
                                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                                    </Carousel>
                                </div>
                            </Col>
                            <Col lg={{ size: 3, offset: 1 }} md={{ size: 3, offset: 1 }} sm="3" xs="12">
                                <div className="single-creative-feature feature-text-right">
                                    <div className="creative-feature-icon">
                                        <i className="zmdi zmdi-attachment"></i>
                                    </div>
                                    <div className="creative-feature-text">
                                        <h4>Rédaction des rapports</h4>
                                        <p>Une fois la copie corrigée, l'application permet d'imprimer (ou d'envoyer) un rapport d'évaluation personnalisé.</p>
                                    </div>
                                </div>
                                <div className="single-creative-feature feature-text-right">
                                    <div className="creative-feature-icon">
                                        <i className="zmdi zmdi-layers"></i>
                                    </div>
                                    <div className="creative-feature-text">
                                        <h4>Gestion des paquets</h4>
                                        <p>Avec le traitement des copies par paquet, vous savez toujours où vous en êtes : moyenne des notes données, temps passé et à prévoir, forces et faiblesses du paquet etc.</p>
                                    </div>
                                </div>
                                <div className="single-creative-feature feature-text-right">
                                    <div className="creative-feature-icon">
                                        <i className="zmdi zmdi-chart"></i>
                                    </div>
                                    <div className="creative-feature-text">
                                        <h4>Suivi et statistiques</h4>
                                        <p>Vous pouvez choisir de conserver vos évaluations de l'année pour faciliter le suivi des élèves et des classes (en cours de développement).</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                {/* <!-- creative-features-area-end --> */}
                {/* <!-- footer-start --> */}
                <footer>
                    {/* <!-- footer-area-start --> */}
                    <div className="footer-area ptb-100 footer-bg" id="personnal">
                        <div className="container">
                            <Row>
                                <Col lg="3" md="3" sm="4" xs="12">
                                    <div className="footer-widget">
                                        <div className="footer-logo">
                                            <a href="#top">
                                                <img src={logo2} alt="Metreo" style={{ marginTop: -18 }} />
                                            </a>
                                        </div>
                                        <div className="footer-content">
                                            <p>Le site metreo.fr et les applications associées sont sous la responsabilité du directeur de la publication.</p>
                                            <p>Les informations données par les utilisateurs ne sont visibles que par leurs auteurs. Metreo s'engage à en sécuriser l'accès selon les standards de l'industrie.</p>
                                            <div className="footer-icon">
                                                <a href="https://www.facebook.com/Metreo-156936378300933/" target="_blank" rel="noopener noreferrer">
                                                    <i className="zmdi zmdi-facebook"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="4" md="4" sm="4" xs="12">
                                    <div className="footer-widget">
                                        <h4 className="footer-title">Données personnelles</h4>
                                        <div className="twitter-info text-white">
                                            <ul>
                                                <li>
                                                    <div className="twitter-icon">
                                                        <i className="zmdi zmdi-badge-check"></i>
                                                    </div>
                                                    <div className="twitter-text">
                                                        <p>Metreo ne collecte aucune autre information sur ses utilisateurs que l'adresse email et le nom d'usage qui sert à leur enregistrement dans l'application.<br />Metreo peut collecter des informations générales et techniques comme des rapports de plantage ou des suggestions d'améliorations. <br />Ces informations ne sont pas exploitables en dehors du développement de l'application.</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="2" md="2" sm="hidden" xs="12">
                                    <div className="footer-widget">
                                        <h4 className="footer-title">plan du site</h4>
                                        <ul className="footer-menu">
                                            <li>
                                                <a href="#download" className="menu-items">télécharger</a>
                                            </li>
                                            <li>
                                                <a href="#project" className="menu-items">projet</a>
                                            </li>
                                            <li>
                                                <a href="#features" className="menu-items">caractéristique</a>
                                            </li>
                                            <li>
                                                <a href="#personnal" className="menu-items">données personnelles</a>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col lg="3" md="3" sm="4" xs="12" >
                                    <div className="footer-widget">
                                        <h4 className="footer-title">Contact</h4>
                                        <div className="contact-info text-white">
                                            <ul>
                                                <li>
                                                    <div className="contact-icon">
                                                        <i className="fa fa-envelope"></i>
                                                    </div>
                                                    <div className="menu-items">
                                                        <span><a href="mailto:info@metreo.fr" className="menu-items" target="_blank" rel="noopener noreferrer"> info@metreo.fr</a></span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    {/* <!-- footer-area-end --> */}
                    {/* <!-- copyright-area-start --> */}
                    <div className="copyright-area black-bg ptb-20">
                        <div className="container">
                            <Row>
                                <Col lg="6" md="6" sm="6" xs="12" >
                                    <div className="copyright-left">
                                        <p>thpo 2018 | Tous droits réservés</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    {/* <!-- copyright-area-end --> */}
                </footer>
                {/* <!-- footer-end --> */}
            </div>
        );
    }
}

export default LandingPage;