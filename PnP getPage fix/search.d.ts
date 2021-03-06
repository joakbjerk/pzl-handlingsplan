import { Queryable, QueryableInstance } from "./queryable";
import { Dictionary } from "../collections/collections";
/**
 * Allows for the fluent construction of search queries
 */
export declare class SearchQueryBuilder {
    private _query;
    static create(queryText?: string, queryTemplate?: SearchQuery): SearchQueryBuilder;
    constructor(queryText?: string, _query?: {});
    text(queryText: string): this;
    template(template: string): this;
    sourceId(id: string): this;
    readonly enableInterleaving: this;
    readonly enableStemming: this;
    readonly trimDuplicates: this;
    readonly enableNicknames: this;
    readonly enableFql: this;
    readonly enablePhonetic: this;
    readonly bypassResultTypes: this;
    readonly processBestBets: this;
    readonly enableQueryRules: this;
    readonly enableSorting: this;
    readonly generateBlockRankLog: this;
    rankingModelId(id: string): this;
    startRow(id: number): this;
    rowLimit(id: number): this;
    rowsPerPage(id: number): this;
    selectProperties(...properties: string[]): this;
    culture(culture: number): this;
    refinementFilters(...filters: string[]): this;
    refiners(refiners: string): this;
    hiddenConstraints(constraints: string): this;
    sortList(...sorts: Sort[]): this;
    timeout(milliseconds: number): this;
    hithighlightedProperties(...properties: string[]): this;
    clientType(clientType: string): this;
    personalizationData(data: string): this;
    resultsURL(url: string): this;
    queryTag(...tags: string[]): this;
    properties(...properties: SearchProperty[]): this;
    readonly processPersonalFavorites: this;
    queryTemplatePropertiesUrl(url: string): this;
    reorderingRules(...rules: ReorderingRule[]): this;
    hitHighlightedMultivaluePropertyLimit(limit: number): this;
    readonly enableOrderingHitHighlightedProperty: this;
    collapseSpecification(spec: string): this;
    uiLanguage(lang: number): this;
    desiredSnippetLength(len: number): this;
    maxSnippetLength(len: number): this;
    summaryLength(len: number): this;
    toSearchQuery(): SearchQuery;
    private extendQuery(part);
}
/**
 * Describes the search API
 *
 */
export declare class Search extends QueryableInstance {
    /**
     * Creates a new instance of the Search class
     *
     * @param baseUrl The url for the search context
     * @param query The SearchQuery object to execute
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * .......
     * @returns Promise
     */
    execute(query: SearchQuery): Promise<SearchResults>;
    private fixupProp(prop);
}
/**
 * Describes the SearchResults class, which returns the formatted and raw version of the query response
 */
export declare class SearchResults {
    private _url;
    private _query;
    private _raw;
    private _primary;
    /**
     * Creates a new instance of the SearchResult class
     *
     */
    constructor(rawResponse: any, _url: string, _query: SearchQuery, _raw?: SearchResponse, _primary?: SearchResult[]);
    readonly ElapsedTime: number;
    readonly RowCount: number;
    readonly TotalRows: number;
    readonly TotalRowsIncludingDuplicates: number;
    readonly RawSearchResults: SearchResponse;
    readonly PrimarySearchResults: SearchResult[];
    /**
     * Gets a page of results
     *
     * @param pageNumber Index of the page to return. Used to determine StartRow
     * @param pageSize Optional, items per page (default = 10)
     */
    getPage(pageNumber: number, pageSize?: number): Promise<SearchResults>;
    /**
     * Formats a search results array
     *
     * @param rawResults The array to process
     */
    protected formatSearchResults(rawResults: any): SearchResult[];
}
/**
 * Describes the SearchQuery interface
 */
export interface SearchQuery {
    /**
     * A string that contains the text for the search query.
     */
    Querytext?: string;
    /**
     * A string that contains the text that replaces the query text, as part of a query transform.
     */
    QueryTemplate?: string;
    /**
     * A Boolean value that specifies whether the result tables that are returned for
     * the result block are mixed with the result tables that are returned for the original query.
     */
    EnableInterleaving?: boolean;
    /**
     * A Boolean value that specifies whether stemming is enabled.
     */
    EnableStemming?: boolean;
    /**
     * A Boolean value that specifies whether duplicate items are removed from the results.
     */
    TrimDuplicates?: boolean;
    /**
     * A Boolean value that specifies whether the exact terms in the search query are used to find matches, or if nicknames are used also.
     */
    EnableNicknames?: boolean;
    /**
     * A Boolean value that specifies whether the query uses the FAST Query Language (FQL).
     */
    EnableFql?: boolean;
    /**
     * A Boolean value that specifies whether the phonetic forms of the query terms are used to find matches.
     */
    EnablePhonetic?: boolean;
    /**
     * A Boolean value that specifies whether to perform result type processing for the query.
     */
    BypassResultTypes?: boolean;
    /**
     * A Boolean value that specifies whether to return best bet results for the query.
     * This parameter is used only when EnableQueryRules is set to true, otherwise it is ignored.
     */
    ProcessBestBets?: boolean;
    /**
     * A Boolean value that specifies whether to enable query rules for the query.
     */
    EnableQueryRules?: boolean;
    /**
     * A Boolean value that specifies whether to sort search results.
     */
    EnableSorting?: boolean;
    /**
     * Specifies whether to return block rank log information in the BlockRankLog property of the interleaved result table.
     * A block rank log contains the textual information on the block score and the documents that were de-duplicated.
     */
    GenerateBlockRankLog?: boolean;
    /**
     * The result source ID to use for executing the search query.
     */
    SourceId?: string;
    /**
     * The ID of the ranking model to use for the query.
     */
    RankingModelId?: string;
    /**
     * The first row that is included in the search results that are returned.
     * You use this parameter when you want to implement paging for search results.
     */
    StartRow?: number;
    /**
     * The maximum number of rows overall that are returned in the search results.
     * Compared to RowsPerPage, RowLimit is the maximum number of rows returned overall.
     */
    RowLimit?: number;
    /**
     * The maximum number of rows to return per page.
     * Compared to RowLimit, RowsPerPage refers to the maximum number of rows to return per page,
     * and is used primarily when you want to implement paging for search results.
     */
    RowsPerPage?: number;
    /**
     * The managed properties to return in the search results.
     */
    SelectProperties?: string[];
    /**
     * The locale ID (LCID) for the query.
     */
    Culture?: number;
    /**
     * The set of refinement filters used when issuing a refinement query (FQL)
     */
    RefinementFilters?: string[];
    /**
     * The set of refiners to return in a search result.
     */
    Refiners?: string;
    /**
     * The additional query terms to append to the query.
     */
    HiddenConstraints?: string;
    /**
     * The list of properties by which the search results are ordered.
     */
    SortList?: Sort[];
    /**
     * The amount of time in milliseconds before the query request times out.
     */
    Timeout?: number;
    /**
     * The properties to highlight in the search result summary when the property value matches the search terms entered by the user.
     */
    HithighlightedProperties?: string[];
    /**
     * The type of the client that issued the query.
     */
    ClientType?: string;
    /**
     * The GUID for the user who submitted the search query.
     */
    PersonalizationData?: string;
    /**
     * The URL for the search results page.
     */
    ResultsURL?: string;
    /**
     * Custom tags that identify the query. You can specify multiple query tags
     */
    QueryTag?: string[];
    /**
     * Properties to be used to configure the search query
     */
    Properties?: SearchProperty[];
    /**
     *  A Boolean value that specifies whether to return personal favorites with the search results.
     */
    ProcessPersonalFavorites?: boolean;
    /**
     * The location of the queryparametertemplate.xml file. This file is used to enable anonymous users to make Search REST queries.
     */
    QueryTemplatePropertiesUrl?: string;
    /**
     * Special rules for reordering search results.
     * These rules can specify that documents matching certain conditions are ranked higher or lower in the results.
     * This property applies only when search results are sorted based on rank.
     */
    ReorderingRules?: ReorderingRule[];
    /**
     * The number of properties to show hit highlighting for in the search results.
     */
    HitHighlightedMultivaluePropertyLimit?: number;
    /**
     * A Boolean value that specifies whether the hit highlighted properties can be ordered.
     */
    EnableOrderingHitHighlightedProperty?: boolean;
    /**
     * The managed properties that are used to determine how to collapse individual search results.
     * Results are collapsed into one or a specified number of results if they match any of the individual collapse specifications.
     * In a collapse specification, results are collapsed if their properties match all individual properties in the collapse specification.
     */
    CollapseSpecification?: string;
    /**
     * The locale identifier (LCID) of the user interface
     */
    UIlanguage?: number;
    /**
     * The preferred number of characters to display in the hit-highlighted summary generated for a search result.
     */
    DesiredSnippetLength?: number;
    /**
     * The maximum number of characters to display in the hit-highlighted summary generated for a search result.
     */
    MaxSnippetLength?: number;
    /**
     * The number of characters to display in the result summary for a search result.
     */
    SummaryLength?: number;
}
/**
 * Provides hints at the properties which may be available on the result object
 */
export interface SearchResult {
    Rank?: number;
    DocId?: number;
    WorkId?: number;
    Title?: string;
    Author?: string;
    Size?: number;
    Path?: string;
    Description?: string;
    Write?: Date;
    LastModifiedTime?: Date;
    CollapsingStatus?: number;
    HitHighlightedSummary?: string;
    HitHighlightedProperties?: string;
    contentclass?: string;
    PictureThumbnailURL?: string;
    ServerRedirectedURL?: string;
    ServerRedirectedEmbedURL?: string;
    ServerRedirectedPreviewURL?: string;
    FileExtension?: string;
    ContentTypeId?: string;
    ParentLink?: string;
    ViewsLifeTime?: number;
    ViewsRecent?: number;
    SectionNames?: string;
    SectionIndexes?: string;
    SiteLogo?: string;
    SiteDescription?: string;
    importance?: number;
    SiteName?: string;
    IsDocument?: boolean;
    FileType?: string;
    IsContainer?: boolean;
    WebTemplate?: string;
    SPWebUrl?: string;
    UniqueId?: string;
    ProgId?: string;
    OriginalPath?: string;
    RenderTemplateId?: string;
    PartitionId?: string;
    UrlZone?: number;
    Culture?: string;
}
export interface SearchResponse {
    ElapsedTime: number;
    Properties?: {
        Key: string;
        Value: any;
        ValueType: string;
    }[];
    PrimaryQueryResult?: ResultTableCollection;
    SecondaryQueryResults?: ResultTableCollection;
    SpellingSuggestion?: string;
    TriggeredRules?: any[];
}
export interface ResultTableCollection {
    QueryErrors?: Dictionary<any>;
    QueryId?: string;
    QueryRuleId?: string;
    CustomResults?: ResultTable;
    RefinementResults?: ResultTable;
    RelevantResults?: ResultTable;
    SpecialTermResults?: ResultTable;
}
export interface ResultTable {
    GroupTemplateId?: string;
    ItemTemplateId?: string;
    Properties?: {
        Key: string;
        Value: any;
        ValueType: string;
    }[];
    Table: {
        Rows: {
            Cells: {
                Key: string;
                Value: any;
                ValueType: string;
            }[];
        }[];
    };
    ResultTitle?: string;
    ResultTitleUrl?: string;
    RowCount?: number;
    TableType?: string;
    TotalRows?: number;
    TotalRowsIncludingDuplicates?: number;
}
/**
 * Defines how search results are sorted.
 */
export interface Sort {
    /**
     * The name for a property by which the search results are ordered.
     */
    Property: string;
    /**
     * The direction in which search results are ordered.
     */
    Direction: SortDirection;
}
/**
 * Defines one search property
 */
export interface SearchProperty {
    Name: string;
    Value: SearchPropertyValue;
}
/**
 * Defines one search property value. Set only one of StrlVal/BoolVal/IntVal/StrArray.
 */
export interface SearchPropertyValue {
    StrVal?: string;
    BoolVal?: boolean;
    Intval?: number;
    StrArray?: string[];
    QueryPropertyValueTypeIndex: QueryPropertyValueType;
}
/**
 * defines the SortDirection enum
 */
export declare enum SortDirection {
    Ascending = 0,
    Descending = 1,
    FQLFormula = 2,
}
/**
 * Defines how ReorderingRule interface, used for reordering results
 */
export interface ReorderingRule {
    /**
     * The value to match on
     */
    MatchValue: string;
    /**
     * The rank boosting
     */
    Boost: number;
    /**
    * The rank boosting
    */
    MatchType: ReorderingRuleMatchType;
}
/**
 * defines the ReorderingRuleMatchType  enum
 */
export declare enum ReorderingRuleMatchType {
    ResultContainsKeyword = 0,
    TitleContainsKeyword = 1,
    TitleMatchesKeyword = 2,
    UrlStartsWith = 3,
    UrlExactlyMatches = 4,
    ContentTypeIs = 5,
    FileExtensionMatches = 6,
    ResultHasTag = 7,
    ManualCondition = 8,
}
/**
 * Specifies the type value for the property
 */
export declare enum QueryPropertyValueType {
    None = 0,
    StringType = 1,
    Int32TYpe = 2,
    BooleanType = 3,
    StringArrayType = 4,
    UnSupportedType = 5,
}
export declare class SearchBuiltInSourceId {
    static readonly Documents: string;
    static readonly ItemsMatchingContentType: string;
    static readonly ItemsMatchingTag: string;
    static readonly ItemsRelatedToCurrentUser: string;
    static readonly ItemsWithSameKeywordAsThisItem: string;
    static readonly LocalPeopleResults: string;
    static readonly LocalReportsAndDataResults: string;
    static readonly LocalSharePointResults: string;
    static readonly LocalVideoResults: string;
    static readonly Pages: string;
    static readonly Pictures: string;
    static readonly Popular: string;
    static readonly RecentlyChangedItems: string;
    static readonly RecommendedItems: string;
    static readonly Wiki: string;
}
