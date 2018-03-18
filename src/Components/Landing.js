import React, { Component } from "react";

import logo2 from './../logo2.png';
import generic from "./../generic2.jpg";
import iphoneaplat from "./../img/showcase/iphoneaplat.png";
import ScrollUpButton from "react-scroll-up-button";

import Carousel from "./Carousel"

import Typist from "react-typist";
import { Grid, Image } from 'semantic-ui-react'

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.changeHandler = this.changeHandler.bind(this)
        this.state = {
            slideIndex: 0,
            updateCount: 0,
        }
    }

    changeHandler(view) {
        this.sliderWrapper.slider.slickGoTo(view)
    }

    changeUpdateCount(e) {
        this.setState({
            updateCount: this.state.updateCount + 1
        }, () => console.log(`test state after update: ${this.state.updateCount}`))
    }

    render() {
        return (
            <div className="bigCont">
                <ScrollUpButton />
                <div className="slider-area-5">
                    <div className="slider-Image">
                        <Image src={generic} alt="" />
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
                {/* <!-- showcase-area-start --> */}
                <div className="showcase-area nav-style-1 ptb-100 transparent-bg" id="project">
                    <div className="container">
                        <Grid.Row>
                            <Grid.Column>
                                <div className="section-title text-center">
                                    <h2>projet</h2>
                                    <p>
                                        Réalisée entièrement par un professeur de philosophie (au départ pour son propre usage), Metreo est la première application d'assistance à la correction à destination des enseignants. <br />Les professeurs  gagnent du temps et des informations et simplifient leur organisation. Les élèves profitent de rapports d'évaluation précis qui leur permettent de mieux comprendre leurs atouts, leurs faiblesses et leurs progrès au vu de ce qui est attendu d'eux.</p>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <div className="showcase-slider">
                                <div className="showcase-active">
                                    <Grid.Column>
                                        <div className="single-showcase">
                                            <Image src={iphoneaplat} alt="" />
                                        </div>
                                    </Grid.Column>
                                </div>
                            </div>
                        </Grid.Row>
                    </div>
                </div>
                {/* <!-- showcase-area-end --> */}
                {/* <!-- Get-in-touch-area-start --> */}
                <div className="get-in-touch-area ptb-100 default-bg" id="download">
                    <div className="container">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <div className="section-title text-center">
                                        <h2>Où trouver metreo ?</h2>
                                        <p>Vous pouvez retrouver Metreo dans les stores iTunes (si vous avez un iphone) ou Google Play (si vous utilisez android). <br /> La version standard est gratuite et elle le restera toujours.</p>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
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
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>
                {/* <!-- Get-in-touch-area-end --> */}
                {/* <!-- creative-features-area-start --> */}
                <div className="creative-features-area ptb-100" id="features">
                    <div className="container">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <div className="section-title text-center">
                                        <h2>Caractéristiques</h2>
                                        <p>Metreo est aussi simple à prendre en main que riche en fonctionnalités.<br />Vous pouvez opter pour corriger une copie seule ou un paquet entier - et de conserver en mémoire les élèves, les sujets donnés et les copies corrigées, ce qui vous permet d'assurer un suivi sur la durée.</p>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid columns={3} divided>
                            <Grid.Row>
                                <Grid.Column>
                                    <div className="single-creative-feature" onClick={() => this.changeHandler(0)}>
                                        <div className="creative-feature-icon">
                                            <i className="zmdi zmdi-edit"></i>
                                        </div>
                                        <div className="creative-feature-text">
                                            <h4>Aide à la correction</h4>
                                            <p>Metreo facilite et enrichit le travail de lecture des copies. On y passe un peu moins de temps et on en retire bien davantage.</p>
                                        </div>
                                    </div>
                                    <div className="single-creative-feature" onClick={() => this.changeHandler(1)}>
                                        <div className="creative-feature-icon">
                                            <i className="zmdi zmdi-arrow-split"></i>
                                        </div>
                                        <div className="creative-feature-text">
                                            <h4>Critères types</h4>
                                            <p>L'application est distribuée avec dix critères d'évaluation prédéfinis. Vous pouvez les conserver ou les remplacer par les vôtres.</p>
                                        </div>
                                    </div>
                                    <div className="single-creative-feature" onClick={() => this.changeHandler(7)}>
                                        <div className="creative-feature-icon">
                                            <i className="zmdi zmdi-comment-text"></i>
                                        </div>
                                        <div className="creative-feature-text">
                                            <h4>Commentaires types</h4>
                                            <p>L'application comprend une quarantaine de commentaires types, là encore modifiables et adaptables selon vos souhaits.</p>
                                        </div>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className="creative-feature-Image">
                                        <Carousel
                                            ref={sliderWrapper => this.sliderWrapper = sliderWrapper}
                                            slideIndex={this.state.slideIndex}
                                            updateCount={this.state.updateCount}
                                        />
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className="single-creative-feature feature-text-right" onClick={() => this.changeHandler(2)}>
                                        <div className="creative-feature-icon">
                                            <i className="zmdi zmdi-attachment"></i>
                                        </div>
                                        <div className="creative-feature-text">
                                            <h4>Rédaction des rapports</h4>
                                            <p>Une fois la copie corrigée, l'application permet d'imprimer (ou d'envoyer) un rapport d'évaluation personnalisé.</p>
                                        </div>
                                    </div>
                                    <div className="single-creative-feature feature-text-right" onClick={() => this.changeHandler(4)}>
                                        <div className="creative-feature-icon">
                                            <i className="zmdi zmdi-layers"></i>
                                        </div>
                                        <div className="creative-feature-text">
                                            <h4>Gestion des paquets</h4>
                                            <p>Avec le traitement des copies par paquet, vous savez toujours où vous en êtes : moyenne des notes données, temps passé et à prévoir, forces et faiblesses du paquet etc.</p>
                                        </div>
                                    </div>
                                    <div className="single-creative-feature feature-text-right" onClick={() => this.changeHandler(6)}>
                                        <div className="creative-feature-icon">
                                            <i className="zmdi zmdi-chart"></i>
                                        </div>
                                        <div className="creative-feature-text">
                                            <h4>Suivi et statistiques</h4>
                                            <p>Vous pouvez choisir de conserver vos évaluations de l'année pour faciliter le suivi des élèves et des classes (en cours de développement).</p>
                                        </div>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>
                {/* <!-- creative-features-area-end --> */}
                {/* <!-- footer-start --> */}
                <footer>
                    {/* <!-- footer-area-start --> */}
                    <div className="footer-area ptb-100 footer-bg" id="personnal">
                        <div className="container">
                            <Grid columns={4} divided>
                                <Grid.Row>
                                    <Grid.Column mobile={16} tablet={8} computer={4} className="footer-widget">
                                        <div className="footer-widget">
                                            <div className="footer-logo">
                                                <a href="#top">
                                                    <Image src={logo2} alt="Metreo" style={{ marginTop: -18 }} />
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
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={8} computer={5} className="footer-widget">
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
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={8} computer={3}>
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
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={8} computer={3} >
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
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </div>
                    {/* <!-- footer-area-end --> */}
                    {/* <!-- copyright-area-start --> */}
                    <div className="copyright-area black-bg ptb-20">
                        <Grid className="container">
                            <Grid.Row>
                                <Grid.Column lg="6" md="6" sm="6" xs="12" >
                                    <div className="copyright-left">
                                        <p>thpo 2018 | Tous droits réservés</p>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    {/* <!-- copyright-area-end --> */}
                </footer>
                {/* <!-- footer-end --> */}
            </div>
        );
    }
}

export default LandingPage;