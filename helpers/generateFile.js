import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

const dirCodes = path.join(__dirname, 'codes');

if (!fs.existsSync(dirCodes)) {
	fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {
	const jobId = uuid();
	const filename = `${jobId}.${format}`;
	const filepath = path.join(dirCodes, filename);
	await fs.writeFileSync(filepath, content);
	return filepath;
};

module.exports = {
	generateFile,
};
