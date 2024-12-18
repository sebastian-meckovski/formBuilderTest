using Amazon.Lambda.Core;
using System.Text.Json.Serialization;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace ReturnMessage
{
    public class Function
    {
        public class Input
        {
            [JsonPropertyName("result")]
            public int Result { get; set; }
        }

        public class Output
        {
            [JsonPropertyName("message")]
            public string Message { get; set; }
        }

        /// <summary>
        /// A function that takes a JSON input with a result number and returns a JSON output with a message indicating if the number is odd or even
        /// </summary>
        /// <param name="input">The event for the Lambda function handler to process.</param>
        /// <param name="context">The ILambdaContext that provides methods for logging and describing the Lambda environment.</param>
        /// <returns></returns>
        public Output FunctionHandler(Input input, ILambdaContext context)
        {
            string message = input.Result % 2 == 0 ? "number is even" : "number is odd";
            return new Output
            {
                Message = message
            };
        }
    }
}
