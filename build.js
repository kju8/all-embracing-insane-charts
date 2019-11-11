const json5	= require('json5')
const fs	= require('fs');
const path	= require('path');

const FileType = {
	File: 'file',
	Directory: 'directory',
	Unknown: 'unknown'
}

const getFileType = path => {
	try {
		const stat = fs.statSync(path);

		switch (true) {
			case stat.isFile():
			return FileType.File;

			case stat.isDirectory():
			return FileType.Directory;

			default:
			return FileType.Unknown;
		}

	} catch(e) {
		return FileType.Unknown;
	}
}

const listFiles = dirPath => {
	const ret = [];
	const paths = fs.readdirSync(dirPath);

	paths.forEach(a => {
		const filepath = path.join(dirPath,a);

		switch (getFileType(filepath)) {
			case FileType.File:
			ret.push(filepath);
			break;

			case FileType.Directory:
			ret.push(...listFiles(filepath));
			break;

			default:
			/* noop */
		}
	})

	return ret;
};

const dirPath = path.resolve(__dirname, 'charts');
const list =
	listFiles(dirPath)
	.filter(filepath => path.parse(filepath).ext === ".json");
var jsonArray = [];
for(let i in list) {
	jsonArray.push(json5.parse(fs.readFileSync(list[i])));
}

fs.mkdirSync('build', function (err) {
	throw err;
});
fs.writeFileSync('./build/table.json', JSON.stringify(jsonArray));