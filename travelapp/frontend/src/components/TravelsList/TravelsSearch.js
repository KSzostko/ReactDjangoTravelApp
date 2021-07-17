import styled from 'styled-components';
import { Form, Input, DatePicker, Button } from 'antd';

const { RangePicker } = DatePicker;

const SearchForm = styled(Form)`
  margin-bottom: 32px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 8px;
`;

const StyledRangePicker = styled(RangePicker)`
  margin-bottom: 8px;
`;

function filterTravels(values) {
  console.log(values);
}

function TravelsSearch() {
  return (
    <SearchForm name="travels-search" layout="inline" onFinish={filterTravels}>
      <Form.Item name="name">
        <StyledInput aria-label="Nazwa" placeholder="Nazwa" />
      </Form.Item>
      <Form.Item name="dateRange">
        <StyledRangePicker
          aria-label="Termin podróży"
          placeholder={['Start', 'Koniec']}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Szukaj
        </Button>
      </Form.Item>
    </SearchForm>
  );
}

export default TravelsSearch;
