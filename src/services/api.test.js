const buildApiModule = (baseUrl = '') => {
  jest.resetModules();

  if (baseUrl === undefined) {
    delete process.env.REACT_APP_API_BASE_URL;
  } else {
    process.env.REACT_APP_API_BASE_URL = baseUrl;
  }

  const mockApi = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };

  const create = jest.fn(() => mockApi);

  jest.doMock('axios', () => ({
    __esModule: true,
    default: { create },
    create,
  }));

  // eslint-disable-next-line global-require
  const apiModule = require('./api');

  return { apiModule, mockApi, create };
};

describe('services/api', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('normalizes base URL by trimming slash and /api suffix', () => {
    const { create } = buildApiModule('https://example.com/api/');

    expect(create).toHaveBeenCalledWith({
      baseURL: 'https://example.com',
    });
  });

  test('uses empty base URL when env variable is missing', () => {
    const { create } = buildApiModule(undefined);

    expect(create).toHaveBeenCalledWith({
      baseURL: '',
    });
  });

  test('product endpoints call expected routes', () => {
    const { apiModule, mockApi } = buildApiModule('https://example.com');

    apiModule.getProducts();
    apiModule.getProductById(10);
    apiModule.createProduct({ name: 'Mouse' });
    apiModule.updateProduct(11, { name: 'Keyboard' });
    apiModule.deleteProduct(12);

    expect(mockApi.get).toHaveBeenCalledWith('/products');
    expect(mockApi.get).toHaveBeenCalledWith('/products/10');
    expect(mockApi.post).toHaveBeenCalledWith('/products', { name: 'Mouse' });
    expect(mockApi.put).toHaveBeenCalledWith('/products/11', { name: 'Keyboard' });
    expect(mockApi.delete).toHaveBeenCalledWith('/products/12');
  });

  test('order endpoints call expected routes', () => {
    const { apiModule, mockApi } = buildApiModule('https://example.com');

    apiModule.getOrders();
    apiModule.getOrderById(20);
    apiModule.createOrder({ customer: 'Harini' });
    apiModule.updateOrder(21, { status: 'SHIPPED' });
    apiModule.deleteOrder(22);

    expect(mockApi.get).toHaveBeenCalledWith('/orders');
    expect(mockApi.get).toHaveBeenCalledWith('/orders/20');
    expect(mockApi.post).toHaveBeenCalledWith('/orders', { customer: 'Harini' });
    expect(mockApi.put).toHaveBeenCalledWith('/orders/21', { status: 'SHIPPED' });
    expect(mockApi.delete).toHaveBeenCalledWith('/orders/22');
  });
});
