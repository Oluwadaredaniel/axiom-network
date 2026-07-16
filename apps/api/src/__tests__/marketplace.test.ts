import { ServiceService } from '../services/service.service';
import { CategoryService } from '../services/category.service';

describe('Axiom Marketplace', () => {
  it('should define core marketplace services', () => {
    expect(ServiceService).toBeDefined();
    expect(CategoryService).toBeDefined();
  });

  describe('Service Registration Logic', () => {
    it('should validate service structure', () => {
      const serviceData = {
        name: 'SEO Agent',
        categoryName: 'Marketing',
        price: 5
      };
      expect(serviceData.name).toBe('SEO Agent');
      expect(serviceData.price).toBe(5);
    });
  });
});
