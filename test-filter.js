// Test script to verify filter behavior
const testFilter = () => {
  console.log('Testing filter behavior with different data types:')
  
  // Test 1: Normal array
  const normalArray = [{id: 1, status: 'active'}, {id: 2, status: 'inactive'}]
  console.log('Normal array:', normalArray.filter(item => item.status === 'active'))
  
  // Test 2: Empty array
  const emptyArray = []
  console.log('Empty array:', emptyArray.filter(item => item.status === 'active'))
  
  // Test 3: Null
  const nullValue = null
  try {
    console.log('Null value:', nullValue.filter(item => item.status === 'active'))
  } catch (error) {
    console.log('Null value error:', error.message)
  }
  
  // Test 4: Undefined
  const undefinedValue = undefined
  try {
    console.log('Undefined value:', undefinedValue.filter(item => item.status === 'active'))
  } catch (error) {
    console.log('Undefined value error:', error.message)
  }
  
  // Test 5: Object with data property
  const objectWithData = {data: [{id: 1, status: 'active'}]}
  try {
    console.log('Object with data:', objectWithData.filter(item => item.status === 'active'))
  } catch (error) {
    console.log('Object with data error:', error.message)
  }
  
  // Test 6: String
  const stringValue = "test"
  try {
    console.log('String value:', stringValue.filter(item => item.status === 'active'))
  } catch (error) {
    console.log('String value error:', error.message)
  }
}

testFilter()
