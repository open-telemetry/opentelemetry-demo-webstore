import { useAd } from '../../providers/Ad.provider';
import * as S from './Ad.styled';

const Ad = () => {
  const {
    adList: [{ text, redirectUrl } = { text: '', redirectUrl: '' }],
  } = useAd();

  return (
    <S.Ad>
      <S.Link href={redirectUrl}>
        <p>{text}</p>
      </S.Link>
    </S.Ad>
  );
};

export default Ad;
