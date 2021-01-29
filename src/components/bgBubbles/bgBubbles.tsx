import { FC } from "react";
import "./index.less";

const BgBubbles: FC = () => {
  const renderItem = () => {
    const items = [];
    for (let i = 0; i <= 10; i++) {
      items.push(<li key={i}></li>);
    }
    return items;
  };
  return <ul className="bg-bubbles">{renderItem()}</ul>;
};

export default BgBubbles;
