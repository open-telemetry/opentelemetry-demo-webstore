import SessionGateway from '../../gateways/Session.gateway';
import * as S from './Footer.styled';

const { userId: sessionId } = SessionGateway.getSession();

const Footer = () => {
  return (
    <S.Footer>
      <div>
        <p>This website is hosted for demo purpose only. It is not an actual shop. This is not a Google product</p>
        <p>
          <span>session-id: {sessionId}</span>
        </p>
      </div>
      <p>
        @ 2022 OpenTelemetry (<a href="https://github.com/open-telemetry/opentelemetry-demo-webstore">Source Code</a>)
      </p>
    </S.Footer>
  );
};

export default Footer;
