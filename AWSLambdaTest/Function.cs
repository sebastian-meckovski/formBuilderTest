using Amazon.Lambda.Core;
using System.Text.Json.Serialization;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace AWSLambdaTest
{
    public class MultiplyNumbersFunction
    {
        public class Input
        {
            [JsonPropertyName("number")]
            public int Number { get; set; }
        }

        public class Output
        {
            [JsonPropertyName("result")]
            public int Result { get; set; }
        }

        /// <summary>
        /// A function that takes a JSON input with a number and returns a JSON output with the number multiplied by 3
        /// </summary>
        /// <param name="input">The event for the Lambda function handler to process.</param>
        /// <param name="context">The ILambdaContext that provides methods for logging and describing the Lambda environment.</param>
        /// <returns></returns>
        public Output FunctionHandler(Input input, ILambdaContext context)
        {
            return new Output
            {
                Result = input.Number * 3
            };
        }
    }
}
