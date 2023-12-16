import { Button, Modal } from 'antd';
import React from 'react'

const ScoreModal = (props) => {
  const { isModalOpen, setIsModalOpen, Score } = props;

  const handleOk = () => {
    window.location.reload(false);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal title="Score is" open={isModalOpen} onOk={handleOk} footer={[
        <Button onClick={handleOk}>Restart</Button>
      ]}>
        <p className='score'>{Score}</p>
      </Modal>
    </div>
  )
}

export default ScoreModal