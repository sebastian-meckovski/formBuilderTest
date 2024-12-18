using Amazon.Lambda.Core;
using System.Text.Json.Serialization;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace PresentNiceMessage
{
    public class Function
    {
        public class Input
        {
            [JsonPropertyName("message")]
            public string Message { get; set; }
        }

        public class Output
        {
            [JsonPropertyName("responseMessage")]
            public string ResponseMessage { get; set; }
        }

        /// <summary>
        /// A function that checks the input message and returns a formal, longer message based on its content
        /// </summary>
        /// <param name="input">The event for the Lambda function handler to process.</param>
        /// <param name="context">The ILambdaContext that provides methods for logging and describing the Lambda environment.</param>
        /// <returns></returns>
        public Output FunctionHandler(Input input, ILambdaContext context)
        {
            string responseMessage;

            if (input.Message.Contains("odd"))
            {
                responseMessage = "The number you have provided is odd. This indicates that it is not divisible by two without leaving a remainder. Odd numbers are unique and have interesting properties in various mathematical contexts.";
            }
            else if (input.Message.Contains("even"))
            {
                responseMessage = "The number you have provided is even. This means it is divisible by two without any remainder. Even numbers are fundamental in mathematics and have numerous applications in different fields.";
            }
            else
            {
                responseMessage = "The message provided does not contain the keywords 'odd' or 'even'. Please ensure your message includes one of these keywords for a detailed response.";
            }

            return new Output
            {
                ResponseMessage = responseMessage
            };
        }
    }
}
