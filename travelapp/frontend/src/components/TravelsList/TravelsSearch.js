import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Input, DatePicker, Button } from 'antd';
import { parseDate } from 'utils';

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

function TravelsSearch({ setFilterOptionsFn }) {
  function filterTravels({ name, dateRange }) {
    /* eslint-disable */
    const start = dateRange ? parseDate(dateRange?.[0].toDate(), 'yyyy-MM-dd') : '';
    const end = dateRange ? parseDate(dateRange?.[1].toDate(), 'yyyy-MM-dd') : '';
    /* eslint-enable */

    setFilterOptionsFn({
      name: name || '',
      start,
      end,
    });
  }

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

TravelsSearch.propTypes = {
  setFilterOptionsFn: PropTypes.func.isRequired,
};

export default TravelsSearch;
