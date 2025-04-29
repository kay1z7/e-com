import React from "react";
import ContentLoader from "react-content-loader";

const SceletonCard = () => (
  <ContentLoader
    speed={2}
    width={292}
    height={331}
    viewBox="0 0 304 331"
    backgroundColor="#c9c9c9"
    foregroundColor="#757575"
  >
    <rect x="3" y="8" rx="0" ry="0" width="292" height="201" />
    <rect x="7" y="215" rx="0" ry="0" width="70" height="30" />
    <rect x="7" y="258" rx="0" ry="0" width="205" height="19" />
    <rect x="7" y="292" rx="0" ry="0" width="114" height="19" />
    <rect x="178" y="284" rx="18" ry="18" width="115" height="32" />
  </ContentLoader>
);

export default SceletonCard;
