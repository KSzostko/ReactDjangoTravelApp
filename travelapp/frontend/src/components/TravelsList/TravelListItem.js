import { Card } from 'antd';

const { Meta } = Card;

function TraveListItem() {
  return (
    <li>
      <Card
        bordered
        hoverable
        loading={false}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
      >
        <Meta title="title" description="description" />
      </Card>
    </li>
  );
}

export default TraveListItem;
