const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { minimatch } = require('minimatch');

// Check if file is binary
function isBinary(filePath) {
  const buffer = Buffer.alloc(1024);
  const fd = fs.openSync(filePath, 'r');
  const bytesRead = fs.readSync(fd, buffer, 0, 1024, 0);
  fs.closeSync(fd);
  
  for (let i = 0; i < bytesRead; i++) {
    if (buffer[i] === 0) {
      return true;
    }
  }
  return false;
}

// Read file contents
function readFileContents(filePath) {
  const encodings = ['utf-8', 'shift_jis'];
  
  for (const encoding of encodings) {
    try {
      console.log(`Reading file: ${filePath}`);
      return fs.readFileSync(filePath, { encoding });
    } catch (error) {
      if (error instanceof Error && (
          error.message.includes('encoding') || 
          error.code === 'ERR_INVALID_ARG_VALUE' ||
          error.message.includes('Invalid character')
      )) {
        continue; // Try next encoding
      }
      throw error;
    }
  }
  return '';
}

// Generate project summary (src directory only)
function generateSrcSummary(projectDir) {
  const projectName = path.basename(projectDir);
  let summary = `# ${projectName} - src Directory Summary\n\n## Directory Structure\n\n`;
  
  // Patterns for files and directories to ignore
  const ignorePatterns = [
    '.git', '.next', 'node_modules', '.vercel', 'out', 'build',
    'generate_project_summary.js', '.summaryignore',
    `${projectName}_src_summary.txt`, '*.log', '*.lock'
  ];

  let fileContentsSection = '\n## File Contents\n\n';
  
  // Check if src directory exists
  const srcPath = path.join(projectDir, 'src');
  if (!fs.existsSync(srcPath)) {
    console.log('src directory does not exist!');
    return `# ${projectName}\n\nsrc directory does not exist.`;
  }
  
  // Recursively traverse directory function
  function traverseDirectory(dirPath, level) {
    const indent = '  '.repeat(level);
    const dirName = path.basename(dirPath);
    
    summary += `${indent}- ${dirName}/\n`;
    
    const items = fs.readdirSync(dirPath);
    const subindent = '  '.repeat(level + 1);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const relativePath = path.relative(projectDir, itemPath);
      
      // Check if item should be ignored
      let shouldIgnore = false;
      for (const pattern of ignorePatterns) {
        if (minimatch(relativePath, pattern) || 
            minimatch(item, pattern) || 
            minimatch(`${path.sep}${relativePath}`, pattern)) {
          shouldIgnore = true;
          break;
        }
      }
      
      if (shouldIgnore) continue;
      
      if (fs.statSync(itemPath).isDirectory()) {
        traverseDirectory(itemPath, level + 1);
      } else {
        if (!isBinary(itemPath)) {
          summary += `${subindent}- ${item}\n`;
          const content = readFileContents(itemPath);
          
          if (content.trim()) {
            fileContentsSection += `### ${relativePath}\n\n\`\`\`\n${content}\n\`\`\`\n\n`;
          }
        } else {
          summary += `${subindent}- ${item} (binary file)\n`;
        }
      }
    }
  }

  // Only traverse the src directory
  traverseDirectory(srcPath, 0);
  
  // Write summary file
  const outputContent = summary + fileContentsSection;
  fs.writeFileSync(
    `${projectName}_src_summary.txt`,
    outputContent,
    'utf-8'
  );
  
  console.log(`Generated src directory summary: ${projectName}_src_summary.txt`);
  return outputContent;
}

// Main function
function execute() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter project directory path (leave blank for current directory): ', (answer) => {
    const projectDirectory = answer.trim() || process.cwd();
    generateSrcSummary(projectDirectory);
    rl.close();
  });
}

// Execute script
execute();