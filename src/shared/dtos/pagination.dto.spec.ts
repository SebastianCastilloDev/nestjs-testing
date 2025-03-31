import 'reflect-metadata';

import { validate } from 'class-validator';
import { PaginationDto } from './pagination.dto';

describe('PaginationDto', () => {
  it('should validate with default values', async () => {
    const dto = new PaginationDto();

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should validate with valid data', async () => {
    const dto = new PaginationDto();
    dto.limit = 20;
    dto.page = 10;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate with invalid page', async () => {
    const dto = new PaginationDto();
    dto.page = 0;
    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThanOrEqual(1);

    errors.forEach((error) => {
      if (error.property === 'page') {
        expect(error.constraints?.min).toBeDefined();
      }
    });
  });

  it('should validate with invalid limit', async () => {
    const dto = new PaginationDto();
    dto.limit = -1;
    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThanOrEqual(1);

    errors.forEach((error) => {
      if (error.property === 'limit') {
        expect(error.constraints?.min).toBeDefined();
      }
    });
  });
});
