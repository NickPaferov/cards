import styled from "@emotion/styled";
import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";

const Image = styled.img`
  display: block;
`;

export const SmartImage = ({
  src,
  alt,
  onError,
  ...restProps
}: DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => {
  const [image, setImage] = useState(src);

  useEffect(() => setImage(src), [src]);

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    onError && onError(e);
    setImage(undefined);
  };

  return (
    <>
      {image && (
        <Image {...restProps} src={image} onError={handleError} alt={alt} />
      )}
    </>
  );
};
