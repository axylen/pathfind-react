import WeightGrapg from './weightGraph';
import { findPath, findPathBySteps } from './dijkstra';

const graph = new WeightGrapg([
  [1, 0, 1, 1], // 0-3
  [1, 1, 1, 1], // 4-7
  [1, 0, 1, 1], // 8-11
  [1, 0, 1, 1], // 12-15
]);

describe('djikstra algorithm', () => {
  it('searches path', () => {
    const path = findPath(graph, '12', '2');
    expect(path).toEqual(['12', '8', '4', '5', '6', '2']);
  });

  it('searches path', () => {
    const path = findPath(graph, '0', '12');
    expect(path).toEqual(['0', '4', '8', '12']);
  });

  it('searches path with same start and end', () => {
    const path = findPath(graph, '0', '0');
    expect(path).toEqual(['0']);
  });

  it("returns null when can't find a path", () => {
    const path = findPath(graph, '0', '1');
    expect(path).toEqual(null);
  });

  it("returns null when can't find a path", () => {
    const graph = new WeightGrapg([
      [1, 0, 1], // 0-2
      [1, 0, 1], // 3-5
      [1, 0, 1], // 6-8
    ]);

    const path = findPath(graph, '0', '8');
    expect(path).toEqual(null);
  });

  it('searches path by steps', () => {
    const graph = new WeightGrapg([[1, 1, 1, 1]]);

    const step = findPathBySteps(graph, '0', '3');

    expect(step.next().value).toEqual(['1']);
    expect(step.next().value).toEqual(['2']);
    expect(step.next().value).toEqual(['3']);

    expect(step.next()).toEqual({ done: true, value: ['0', '1', '2', '3'] });
  });
});
