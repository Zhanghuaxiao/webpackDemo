const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const moduleAnalyser = (filename) => {
	const content = fs.readFileSync(filename, 'utf-8');
	const ast = parser.parse(content,{
		sourceType: 'module'
	});
	const dependencise = {};
	traverse(ast, {
		ImportDeclaration({ node }) {
			const dirname = path.dirname(filename);
			const newFile = './' + path.join(dirname, node.source.value)
			dependencise[node.source.value] = newFile;
		} 
	});
	const { code } = babel.transformFromAst(ast,null,{
		presets: ['@babel/preset-env']
	})
	return {
		filename,
		dependencise,
		code
	}
}
const makeDependenciesGraph = (entry) => {
	const entryModule = moduleAnalyser(entry);
	let graphArray = [ entryModule ];
	for(let i = 0; i<graphArray.length; i++) {
		const item = graphArray[i];
		const { dependencise } = item;
		if(dependencise) {
			for(let j in dependencise){
				graphArray.push(moduleAnalyser(dependencise[j]));
				console.log(graphArray)
			}
		}
	}
}

const graghInfo = makeDependenciesGraph('./src/index.js')