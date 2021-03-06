import React, { Component } from 'react';

import { Session } from '../model/Session';
import { Link } from 'react-router-dom';
import MaybeLink from './MaybeLink';

export interface Props {
    session: Session | undefined;
}

export interface State { }

function formatTime(dt: string): string {
    return new Date(dt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr';
}

class SessionDetailViewer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        if (this.props.session === undefined) {
            return 'Unbekannte Session-ID';
        }

        return (
            <div className="session-page">
                <header style={{ margin: '2rem 0' }}>
                    <Link to="/" className="button-back">
                        zurück
                    </Link>
                </header>
                <h1>{this.props.session.title}</h1>
                {(this.props.session.description?.long ?? this.props.session.description?.short)
                    ?.split(/\n/)
                    .map((str, i) => (
                        <p key={i}>{str}</p>
                    ))}
                <div className="session-data">
                    <div>
                        <h2>Veranstaltungsdaten</h2>
                        <ul className="session-meta-list">
                            <li>
                                <strong>Datum: </strong>
                                {new Date(this.props.session.start).toLocaleDateString('de-DE')}{' '}
                                {formatTime(this.props.session.start)}
                                {this.props.session.end && ' - ' + formatTime(this.props.session.end)}
                            </li>
                            {this.props.session.links?.event && (
                                <li className="session-section__register">
                                    <strong>Anmeldung: </strong>
                                    <MaybeLink text={this.props.session.links?.event}>
                                        {this.props.session.links?.event}
                                    </MaybeLink>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="session-section__host">
                    <div className="session-page__host">
                        {this.props.session.host.logo && (
                            <div className="session-page__host-logo">
                                <img src={this.props.session.host.logo} alt="Logo" />
                            </div>
                        )}
                        <div>
                            <h3 className="session-page__host-title">Veranstalter</h3>
                            <h2 className="session-page__host-headline">{this.props.session.host.name}</h2>
                            {this.props.session.host.links?.host && (
                                <span className="host-link">
                                    <a href={this.props.session.host.links?.host}>
                                        {this.props.session.host.links?.host}
                                    </a>
                                </span>
                            )}
                            <div className="session-page__host-social">
                                {this.props.session.host.links?.facebook && (
                                    <a href={this.props.session.host.links?.facebook} target="_blank">
                                        <img src="assets/facebook.svg" />
                                    </a>
                                )}
                                {this.props.session.host.links?.twitter && (
                                    <a href={this.props.session.host.links?.twitter} target="_blank">
                                        <img src="assets/twitter.svg" />
                                    </a>
                                )}
                                {this.props.session.host.links?.youtube && (
                                    <a href={this.props.session.host.links?.youtube} target="_blank">
                                        <img src="assets/youtube.svg" />
                                    </a>
                                )}
                                {this.props.session.host.links?.instagram && (
                                    <a href={this.props.session.host.links?.instagram} target="_blank">
                                        <img src="assets/instagram.svg" />
                                    </a>
                                )}
                                {this.props.session.host.links?.xing && (
                                    <a href={this.props.session.host.links?.xing} target="_blank">
                                        <img src="assets/xing.svg" />
                                    </a>
                                )}
                                {this.props.session.host.links?.linkedIn && (
                                    <a href={this.props.session.host.links?.linkedIn} target="_blank">
                                        <img src="assets/linkedin.svg" />
                                    </a>
                                )}
                            </div>
                            <div>
                                {this.props.session.host.infotext?.split(/\n/).map((str, i) => (
                                    <p key={i}>{str}</p>
                                ))}
                            </div>
                            {/*<p>
                                <a href="/veranstalter/102">Weitere Termine von diesem Veranstalter</a>
                            </p>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SessionDetailViewer;
