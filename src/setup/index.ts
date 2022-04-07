import path from 'path';
import dotenv from 'dotenv';
import commandLineArgs, {CommandLineOptions} from 'command-line-args';


// eslint-disable-next-line @typescript-eslint/no-unsafe-call


(() => {
  // Setup command line options
  const options: CommandLineOptions = commandLineArgs([
    {
      name: 'env',
      alias: 'e',
      defaultValue: 'development',
      type: String,
    },
  ]);
  // Set the env file
  const result = dotenv.config({
    path: path.join(__dirname, `${(options.env as string)}.env`),
  });
  if (result.error) {
    throw result.error;
  }
})();
