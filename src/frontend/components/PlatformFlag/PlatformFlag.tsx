import * as S from './PlatformFlag.styled';

const PlatformFlag = () => {
  return (
    <S.PlatformFlag $platform={S.Platform.LOCAL}>
      <S.Block $platform={S.Platform.LOCAL}>local</S.Block>
    </S.PlatformFlag>
  );
};

export default PlatformFlag;
