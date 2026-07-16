import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { sendSuccess, sendError } from '../utils/response';

export class CategoryController {
  static async getCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getAllCategories();
      return sendSuccess(res, categories);
    } catch (error: any) {
      return sendError(res, 'Failed to fetch categories');
    }
  }

  static async seed(req: Request, res: Response) {
    try {
      await CategoryService.seedCategories();
      return sendSuccess(res, { message: 'Categories seeded successfully' });
    } catch (error: any) {
      return sendError(res, 'Failed to seed categories');
    }
  }
}
