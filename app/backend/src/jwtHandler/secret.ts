import * as fs from 'fs';

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

export default secret;
