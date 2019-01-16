import { CodeGenerator } from "./CodeGenerator";
import ClassScheme from "./schema/ClassScheme";
import SourceCode from "./SourceCode";
import ApiMethodScheme from "./schema/ApiMethodScheme";
import CustomPrimitiveScheme from "./schema/CustomPrimitiveScheme";
export default class TypescriptCodeGenerator implements CodeGenerator {
    generateClass(scheme: ClassScheme): SourceCode;
    generateInterface(scheme: ClassScheme): SourceCode;
    generateCustomPrimitive(scheme: CustomPrimitiveScheme, withoutDeserializeFunc: boolean): SourceCode;
    generateApiMethod(scheme: ApiMethodScheme): SourceCode;
    generateApiMethodParamsInterface(scheme: ApiMethodScheme): SourceCode;
    private generateClassConstructor;
    private generateClassConstructorJSDoc;
    private generateDeserializeMethod;
    private renderType;
    private genComa;
    private renderVectorDeserialize;
    private generateClassAlias;
}
