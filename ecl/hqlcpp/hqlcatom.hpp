/*##############################################################################

    HPCC SYSTEMS software Copyright (C) 2012 HPCC Systems®.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
############################################################################## */
#ifndef __HQLCATOM_HPP_
#define __HQLCATOM_HPP_

#ifdef HQLCPP_EXPORTS
#define HQLCPP_API DECL_EXPORT
#else
#define HQLCPP_API DECL_IMPORT
#endif

extern IAtom * _accessedFromChild_Atom;
extern IAtom * accessorAtom;
extern IAtom * activeActivityMarkerAtom;
extern IAtom * activeMatchTextAtom;
extern IAtom * activeMatchUnicodeAtom;
extern IAtom * activeMatchUtf8Atom;
extern IAtom * activeProductionMarkerAtom;
extern IAtom * activeValidateMarkerAtom;
extern IAtom * activityIdMarkerAtom;
extern IAtom * bitfieldOffsetAtom;
extern IAtom * blobHelperAtom;
extern IAtom * branchAtom;
extern IAtom * checkpointAtom;
extern IAtom * childAtom;
extern IAtom * classAtom;
extern IAtom * clearAtom;
extern IAtom * __clearHelperAtom;
extern IAtom * _conditionalRowMarker_Atom;
extern IAtom * csvReadMarkerAtom;
extern IAtom * decimalAtom;
extern IAtom * declareAtom;
extern IAtom * delayedAtom;
extern IAtom * dependencyAtom;
extern IAtom * deserializerAtom;
extern IAtom * dictionaryAtom;
extern IAtom * eclAtom;
extern IAtom * endAtom;
extern IAtom * ensureCapacityAtom;
extern IAtom * fileAtom;
extern IAtom * forceAllCheckAtom;
extern IAtom * funnelAtom;
extern IAtom * goAtom;
extern IAtom * guardAtom;
extern IAtom * helperAtom;
extern IAtom * indexLayoutMarkerAtom;
extern IAtom * initAtom;
extern IAtom * insideOnCreateAtom;
extern IAtom * insideOnStartAtom;
extern IAtom * instanceAtom;
extern IAtom * isLastBitfieldAtom;
extern IAtom * _loop_Atom;
extern IAtom * _loopFirst_Atom;
extern IAtom * mainprototypesAtom;
extern IAtom * multiInstanceAtom;
extern IAtom * _noAccess_Atom;
extern IAtom * _noReplicate_Atom;
extern IAtom * noSetAtom;
extern IAtom * _noVirtual_Atom;
extern IAtom * numResultsAtom;
extern IAtom * packingAtom;
extern IAtom * parentHelpersAtom;
extern IAtom * pathAtom;
extern IAtom * prefetcherInstanceMarkerAtom;
extern IAtom * quickAtom;
extern IAtom * _regexFindInstance_Atom;
extern IAtom * _regexInstance_Atom;
extern IAtom * resultsAtom;
extern IAtom * rowAllocatorMarkerAtom;
extern IAtom * rtlFieldKeyMarkerAtom;
extern IAtom * _selfJoinPlaceholder_Atom;
extern IAtom * serializerAtom;
extern IAtom * serializerInstanceMarkerAtom;
extern IAtom * skipActionMarkerAtom;
extern IAtom * skipReturnMarkerAtom;
extern IAtom * speedAtom;
extern IAtom * _spill_Atom;
extern IAtom * _spillReason_Atom;
extern IAtom * _steppedMeta_Atom;
extern IAtom * subgraphAtom;
extern IAtom * _translated_Atom;
extern IAtom * userFunctionAtom;
extern IAtom * utf8Atom;
extern IAtom * wrapperAtom;
extern IAtom * xmlColumnProviderAtom;
extern IAtom * xmlReadMarkerAtom;


extern IIdAtom * acosId;
extern IIdAtom * addAggregateRowId;
extern IIdAtom * addAllId;
extern IIdAtom * addRangeId;
extern IIdAtom * addWorkunitAssertFailureId;
extern IIdAtom * an2bId;
extern IIdAtom * an2fId;
extern IIdAtom * an2l4Id;
extern IIdAtom * an2l8Id;
extern IIdAtom * an2ls4Id;
extern IIdAtom * an2ls8Id;
extern IIdAtom * appendRowsToRowsetId;
extern IIdAtom * appendSetXId;
extern IIdAtom * ascii2ebcdicId;
extern IIdAtom * asinId;
extern IIdAtom * atan2Id;
extern IIdAtom * atanId;
extern IIdAtom * bool2DataId;
extern IIdAtom * bool2StrId;
extern IIdAtom * bool2StrXId;
extern IIdAtom * bool2VStrId;
extern IIdAtom * bool2VStrXId;
extern IIdAtom * castIntId[9][2];
extern IIdAtom * checkFieldOverflowId;
extern IIdAtom * checkRowOverflowId;
extern IIdAtom * clibExpId;
extern IIdAtom * cloneVStringId;
extern IIdAtom * cloneVStringXId;
extern IIdAtom * codeGeneratorId;
extern IIdAtom * codepage2UnicodeId;
extern IIdAtom * codepage2UnicodeXId;
extern IIdAtom * codepageToUtf8Id;
extern IIdAtom * codepageToUtf8XId;
extern IIdAtom * codepage2VUnicodeId;
extern IIdAtom * codepage2VUnicodeXId;
extern IIdAtom * columnGetBoolId;
extern IIdAtom * columnGetDataId;
extern IIdAtom * columnGetDataXId;
extern IIdAtom * columnGetIntId;
extern IIdAtom * columnGetQStringId;
extern IIdAtom * columnGetSetIsAllId;
extern IIdAtom * columnGetStringId;
extern IIdAtom * columnGetStringXId;
extern IIdAtom * columnGetUnicodeXId;
extern IIdAtom * columnGetUtf8XId;
extern IIdAtom * columnReadBoolId;
extern IIdAtom * columnReadDataId;
extern IIdAtom * columnReadDataXId;
extern IIdAtom * columnReadIntId;
extern IIdAtom * columnReadQStringId;
extern IIdAtom * columnReadSetIsAllId;
extern IIdAtom * columnReadStringId;
extern IIdAtom * columnReadStringXId;
extern IIdAtom * columnReadUnicodeXId;
extern IIdAtom * columnReadUtf8XId;
extern IIdAtom * compareDataDataId;
extern IIdAtom * compareEStrEStrId;
extern IIdAtom * compareQStrQStrId;
extern IIdAtom * compareStrBlankId;
extern IIdAtom * compareStrStrId;
extern IIdAtom * compareUnicodeUnicodeId;
extern IIdAtom * compareUnicodeUnicodeStrengthId;
extern IIdAtom * compareUtf8Utf8Id;
extern IIdAtom * compareUtf8Utf8StrengthId;
extern IIdAtom * compareVStrVStrId;
extern IIdAtom * compareVUnicodeVUnicodeId;
extern IIdAtom * compareVUnicodeVUnicodeStrengthId;
extern IIdAtom * concatId;
extern IIdAtom * concatExtendId;
extern IIdAtom * concatStr2StrId;
extern IIdAtom * concatStrFId;
extern IIdAtom * concatStrExtendId;
extern IIdAtom * concatUnicodeId;
extern IIdAtom * concatUnicodeExtendId;
extern IIdAtom * concatUnicodeFId;
extern IIdAtom * concatUnicodeToUnicodeId;
extern IIdAtom * concatUtf8Id;
extern IIdAtom * concatUtf8ToUtf8Id;
extern IIdAtom * concatVStr2StrId;
extern IIdAtom * concatVStrId;
extern IIdAtom * concatVStrFId;
extern IIdAtom * concatVUnicodeId;
extern IIdAtom * concatVUnicodeFId;
extern IIdAtom * concatVUnicodeToUnicodeId;
extern IIdAtom * cosId;
extern IIdAtom * coshId;
extern IIdAtom * countProviderId;
extern IIdAtom * countRowsId;
extern IIdAtom * countToSizeId;
extern IIdAtom * crcDataId;
extern IIdAtom * crcUnicodeId;
extern IIdAtom * crcUtf8Id;
extern IIdAtom * crcVStrId;
extern IIdAtom * crcVUnicodeId;
extern IIdAtom * createBlobId;
extern IIdAtom * createDataRangeLowId;
extern IIdAtom * createDataRangeHighId;
extern IIdAtom * createOrderId;
extern IIdAtom * createQStrRangeLowId;
extern IIdAtom * createQStrRangeHighId;
extern IIdAtom * createQuotedStringId;
extern IIdAtom * createRangeLowId;
extern IIdAtom * createRangeHighId;
extern IIdAtom * createRealInfId;
extern IIdAtom * createRealNullId;
extern IIdAtom * createRowFromJsonId;
extern IIdAtom * createRowFromXmlId;
extern IIdAtom * createRowStreamId;
extern IIdAtom * createStrRangeLowId;
extern IIdAtom * createStrRangeHighId;
extern IIdAtom * createUnicodeRangeLowId;
extern IIdAtom * createUnicodeRangeHighId;
extern IIdAtom * createRegexId;
extern IIdAtom * createWRegexId;
extern IIdAtom * csvStr2BoolId;
extern IIdAtom * ctxGetRowJsonId;
extern IIdAtom * ctxGetRowXmlId;
extern IIdAtom * data2BoolId;
extern IIdAtom * dataset2DatasetXId;
extern IIdAtom * dataset2RowsetXId;
extern IIdAtom * DecAbsId;
extern IIdAtom * DecAddId;
extern IIdAtom * DecCompareDecimalId;
extern IIdAtom * DecCompareUDecimalId;
extern IIdAtom * DecCompareNullId;
extern IIdAtom * DecDistinctId;
extern IIdAtom * DecDistinctRId;
extern IIdAtom * DecDivideId;
extern IIdAtom * DecModulusId;
extern IIdAtom * DecMulId;
extern IIdAtom * DecNegateId;
extern IIdAtom * DecPopDecimalId;
extern IIdAtom * DecPopInt64Id;
extern IIdAtom * DecPopLongId;
extern IIdAtom * DecPopRealId;
extern IIdAtom * DecPopStringId;
extern IIdAtom * DecPopStringXId;
extern IIdAtom * DecPopUDecimalId;
extern IIdAtom * DecPopVStringId;
extern IIdAtom * DecPopVStringXId;
extern IIdAtom * DecPushCStringId;
extern IIdAtom * DecPushDecimalId;
extern IIdAtom * DecPushInt64Id;
extern IIdAtom * DecPushLongId;
extern IIdAtom * DecPushQStringId;
extern IIdAtom * DecPushRealId;
extern IIdAtom * DecPushStringId;
extern IIdAtom * DecPushUDecimalId;
extern IIdAtom * DecPushUInt64Id;
extern IIdAtom * DecPushUnicodeId;
extern IIdAtom * DecPushUtf8Id;
extern IIdAtom * DecRoundId;
extern IIdAtom * DecRoundUpId;
extern IIdAtom * DecRoundToId;
extern IIdAtom * DecSetPrecisionId;
extern IIdAtom * DecSubId;
extern IIdAtom * DecTruncateId;
extern IIdAtom * DecTruncateAtId;
extern IIdAtom * DecValidId;
extern IIdAtom * DecValidTosId;
extern IIdAtom * deleteFileId;
extern IIdAtom * deserializeRawId;
extern IIdAtom * deserializeChildDictionaryFromDatasetFromStreamId;
extern IIdAtom * deserializeChildDictionaryFromStreamId;
extern IIdAtom * deserializeChildRowsetFromStreamId;
extern IIdAtom * deserializeCStringXId;
extern IIdAtom * deserializeDataXId;
extern IIdAtom * deserializeDatasetXId;
extern IIdAtom * deserializeDictionaryXId;
extern IIdAtom * deserializeGroupedDatasetXId;
extern IIdAtom * deserializeQStrXId;
extern IIdAtom * deserializeRowId;
extern IIdAtom * deserializeRowsetXId;
extern IIdAtom * deserializeGroupedRowsetXId;
extern IIdAtom * deserializeSetId;
extern IIdAtom * deserializeStringXId;
extern IIdAtom * deserializeUnicodeXId;
extern IIdAtom * deserializeUtf8XId;
extern IIdAtom * deserializeVUnicodeXId;
extern IIdAtom * deserializerReadNId;
extern IIdAtom * deserializerReadPackedIntId;
extern IIdAtom * deserializerReadSizeId;
extern IIdAtom * deserializerReadUtf8Id;
extern IIdAtom * deserializerReadVStrId;
extern IIdAtom * deserializerReadVUniId;
extern IIdAtom * deserializerPeekId;
extern IIdAtom * deserializerBeginNestedId;
extern IIdAtom * deserializerFinishedNestedId;
extern IIdAtom * deserializerSkipNId;
extern IIdAtom * deserializerSkipPackedIntId;
extern IIdAtom * deserializerSkipUtf8Id;
extern IIdAtom * deserializerSkipVStrId;
extern IIdAtom * deserializerSkipVUniId;
extern IIdAtom * destroyRegexId;
extern IIdAtom * destroyWRegexId;
extern IIdAtom * destructMetaMemberId;
extern IIdAtom * dictionaryCountId;
extern IIdAtom * dictionaryExistsId;
extern IIdAtom * dictionaryLookupId;
extern IIdAtom * dictionaryLookupExistsId;
extern IIdAtom * doNotifyId;
extern IIdAtom * doNotifyTargetId;
extern IIdAtom * ebcdic2asciiId;
extern IIdAtom * en2fId;
extern IIdAtom * en2l4Id;
extern IIdAtom * en2l8Id;
extern IIdAtom * en2ls4Id;
extern IIdAtom * en2ls8Id;
extern IIdAtom * ensureCapacityId;
extern IIdAtom * ensureRowAvailableId;
extern IIdAtom * __eogId;
extern IIdAtom * estr2EStrId;
extern IIdAtom * estr2VStrId;
extern IIdAtom * estr2VStrXId;
extern IIdAtom * evaluateChildQueryInstanceId;
extern IIdAtom * ex2fId;
extern IIdAtom * executeGraphId;
extern IIdAtom * executeChildQueryInstanceId;
extern IIdAtom * f2anId;
extern IIdAtom * f2axId;
extern IIdAtom * f2vnId;
extern IIdAtom * f2vxId;
extern IIdAtom * failDivideByZeroId;
extern IIdAtom * _failId;
extern IIdAtom * fileExistsId;
extern IIdAtom * finalizeRowClearId;
extern IIdAtom * freeId;
extern IIdAtom * freeExceptionId;
extern IIdAtom * getBytesFromBuilderId;
extern IIdAtom * getChildQueryDictionaryResultId;
extern IIdAtom * getChildQueryLinkedResultId;
extern IIdAtom * getChildQueryLinkedRowResultId;
extern IIdAtom * getClusterSizeId;
extern IIdAtom * getDatasetHashId;
extern IIdAtom * getECLId;
extern IIdAtom * getEnvId;
extern IIdAtom * getEventExtraId;
extern IIdAtom * getEventNameId;
extern IIdAtom * getExpandLogicalNameId;
extern IIdAtom * getExternalResultHashId;
extern IIdAtom * getFailMessageId;
extern IIdAtom * getFilePositionId;
extern IIdAtom * getGraphLoopCounterId;
extern IIdAtom * getIsValidId;
extern IIdAtom * getLocalDictionaryResultId;
extern IIdAtom * getLocalFailMessageId;
extern IIdAtom * getLocalFilePositionId;
extern IIdAtom * getLocalLinkedResultId;
extern IIdAtom * getLocalLinkedRowResultId;
extern IIdAtom * getMatchedId;
extern IIdAtom * getMatchLengthId;
extern IIdAtom * getMatchPositionId;
extern IIdAtom * getMatchRowId;
extern IIdAtom * getMatchTextId;
extern IIdAtom * getMatchUnicodeId;
extern IIdAtom * getMatchUtf8Id;
extern IIdAtom * getPackedSignedId;
extern IIdAtom * getPackedSizeId;
extern IIdAtom * getPackedUnsignedId;
extern IIdAtom * getProductionResultId;
extern IIdAtom * getProductionTextId;
extern IIdAtom * getProductionUnicodeId;
extern IIdAtom * getProductionUtf8Id;
extern IIdAtom * getResultBoolId;
extern IIdAtom * getResultDataId;
extern IIdAtom * getResultDatasetId;
extern IIdAtom * getResultDecimalId;
extern IIdAtom * getResultDictionaryId;
extern IIdAtom * getResultHashId;
extern IIdAtom * getResultIntId;
extern IIdAtom * getResultQStringId;
extern IIdAtom * getResultRealId;
extern IIdAtom * getResultRowsetId;
extern IIdAtom * getResultSetId;
extern IIdAtom * getResultStringId;
extern IIdAtom * getResultStringFId;
extern IIdAtom * getResultUnicodeId;
extern IIdAtom * getResultVarStringId;
extern IIdAtom * getResultVarUnicodeId;
extern IIdAtom * getRootResultId;
extern IIdAtom * getStartCyclesId;
extern IIdAtom * getWorkflowIdId;
extern IIdAtom * getWuidId;
extern IIdAtom * groupedDataset2RowsetXId;
extern IIdAtom * groupedRowset2DatasetXId;
extern IIdAtom * hash32DataId;
extern IIdAtom * hash32Data1Id;
extern IIdAtom * hash32Data2Id;
extern IIdAtom * hash32Data3Id;
extern IIdAtom * hash32Data4Id;
extern IIdAtom * hash32Data5Id;
extern IIdAtom * hash32Data6Id;
extern IIdAtom * hash32Data7Id;
extern IIdAtom * hash32Data8Id;
extern IIdAtom * hash32UnicodeId;
extern IIdAtom * hash32Utf8Id;
extern IIdAtom * hash32VStrId;
extern IIdAtom * hash32VUnicodeId;
extern IIdAtom * hash64DataId;
extern IIdAtom * hash64UnicodeId;
extern IIdAtom * hash64Utf8Id;
extern IIdAtom * hash64VStrId;
extern IIdAtom * hash64VUnicodeId;
extern IIdAtom * hashDataId;
extern IIdAtom * hashDataNCId;
extern IIdAtom * hashMd5FinishId;
extern IIdAtom * hashMd5InitId;
extern IIdAtom * hashMd5DataId;
extern IIdAtom * hashUnicodeId;
extern IIdAtom * hashUtf8Id;
extern IIdAtom * hashVStrId;
extern IIdAtom * hashVStrNCId;
extern IIdAtom * hashVUnicodeId;
extern IIdAtom * IIndirectMemberVisitor_visitRowId;
extern IIdAtom * IIndirectMemberVisitor_visitRowsetId;
extern IIdAtom * initProcessId;
extern IIdAtom * intFormatId;
extern IIdAtom * isResultId;
extern IIdAtom * keyUnicodeXId;
extern IIdAtom * keyUnicodeStrengthXId;
extern IIdAtom * killRangeId;
extern IIdAtom * l42anId;
extern IIdAtom * l42axId;
extern IIdAtom * l42vnId;
extern IIdAtom * l42vxId;
extern IIdAtom * l82anId;
extern IIdAtom * l82axId;
extern IIdAtom * l82vnId;
extern IIdAtom * l82vxId;
extern IIdAtom * linkdataset2linkdatasetId;
extern IIdAtom * linkRowId;
extern IIdAtom * linkRowsetId;
extern IIdAtom * lnId;
extern IIdAtom * loadResourceId;
extern IIdAtom * log10Id;
extern IIdAtom * lookupBlobId;
extern IIdAtom * ls42anId;
extern IIdAtom * ls42axId;
extern IIdAtom * ls42vnId;
extern IIdAtom * ls42vxId;
extern IIdAtom * ls82anId;
extern IIdAtom * ls82axId;
extern IIdAtom * ls82vnId;
extern IIdAtom * ls82vxId;
extern IIdAtom * memcmpId;
extern IIdAtom * memcpyId;
extern IIdAtom * memsetId;
extern IIdAtom * newWhenActionArgId;
extern IIdAtom * newCountAggregateArgId;
extern IIdAtom * newDegroupArgId;
extern IIdAtom * newExistsAggregateArgId;
extern IIdAtom * newFunnelArgId;
extern IIdAtom * newGraphLoopResultWriteArgId;
extern IIdAtom * newLibraryConstantRawIteratorArgId;
extern IIdAtom * newLocalResultReadArgId;
extern IIdAtom * newLocalResultSpillArgId;
extern IIdAtom * newMemorySpillReadArgId;
extern IIdAtom * newMemorySpillSplitArgId;
extern IIdAtom * newNullArgId;
extern IIdAtom * newSelectNArgId;
extern IIdAtom * newSplitArgId;
extern IIdAtom * newWorkUnitReadArgId;
extern IIdAtom * newWorkUnitWriteArgId;
extern IIdAtom * noteSectionTimeId;
extern IIdAtom * offsetProviderId;
extern IIdAtom * outputXmlBeginArrayId;
extern IIdAtom * outputXmlBeginNestedId;
extern IIdAtom * outputXmlBoolId;
extern IIdAtom * outputXmlDataId;
extern IIdAtom * outputXmlDecimalId;
extern IIdAtom * outputXmlEndArrayId;
extern IIdAtom * outputXmlEndNestedId;
extern IIdAtom * outputXmlIntId;
extern IIdAtom * outputXmlQStringId;
extern IIdAtom * outputXmlRealId;
extern IIdAtom * outputXmlSetAllId;
extern IIdAtom * outputXmlStringId;
extern IIdAtom * outputXmlUIntId;
extern IIdAtom * outputXmlUnicodeId;
extern IIdAtom * outputXmlUtf8Id;
extern IIdAtom * powerId;
extern IIdAtom * prefixDiffStrId;
extern IIdAtom * prefixDiffUnicodeId;
extern IIdAtom * processFieldBoolId;
extern IIdAtom * processFieldDataId;
extern IIdAtom * processFieldDecimalId;
extern IIdAtom * processFieldIntId;
extern IIdAtom * processFieldQStringId;
extern IIdAtom * processFieldRealId;
extern IIdAtom * processFieldStringId;
extern IIdAtom * processFieldUIntId;
extern IIdAtom * processFieldUnicodeId;
extern IIdAtom * processFieldUtf8Id;
extern IIdAtom * processFieldSetAllId;
extern IIdAtom * processFieldBeginSetId;
extern IIdAtom * processFieldBeginDatasetId;
extern IIdAtom * processFieldBeginRowId;
extern IIdAtom * processFieldEndSetId;
extern IIdAtom * processFieldEndDatasetId;
extern IIdAtom * processFieldEndRowId;
extern IIdAtom * qstr2BoolId;
extern IIdAtom * qstr2DataId;
extern IIdAtom * qstr2DataXId;
extern IIdAtom * qstrToQStrId;
extern IIdAtom * qstrToQStrXId;
extern IIdAtom * qstr2StrId;
extern IIdAtom * qstr2StrXId;
extern IIdAtom * qstr2VStrId;
extern IIdAtom * qstrLengthId;
extern IIdAtom * qstrSizeId;
extern IIdAtom * queryFailCodeId;
extern IIdAtom * queryLocalFailCodeId;
extern IIdAtom * queryLocalResultId;
extern IIdAtom * queryLogicalFilenameId;
extern IIdAtom * rankedFromOrderId;
extern IIdAtom * rankFromOrderId;
extern IIdAtom * readIntId[9][2];
extern IIdAtom * readSwapIntId[9][2];
extern IIdAtom * realFormatId;
extern IIdAtom * regexFindXId;
extern IIdAtom * regexGetFindStrId;
extern IIdAtom * regexNewSetStrPatternId;
extern IIdAtom * regexNewSetUStrPatternId;
extern IIdAtom * regexNewStrFindId;
extern IIdAtom * regexNewStrFoundId;
extern IIdAtom * regexNewStrFoundXId;
extern IIdAtom * regexNewStrReplaceXId;
extern IIdAtom * regexNewUStrFindId;
extern IIdAtom * regexNewUStrFoundId;
extern IIdAtom * regexNewUStrFoundXId;
extern IIdAtom * regexNewUStrReplaceXId;
extern IIdAtom * regexMatchSetId;
extern IIdAtom * regexUStrMatchSetId;
extern IIdAtom * regexReplaceXId;
extern IIdAtom * registerTimerId;
extern IIdAtom * releaseRowId;
extern IIdAtom * releaseRowsetId;
extern IIdAtom * reportFieldOverflowId;
extern IIdAtom * reportRowOverflowId;
extern IIdAtom * responseinfoId;
extern IIdAtom * restoreClusterId;
extern IIdAtom * returnPersistVersionId;
extern IIdAtom * reverseIntId[9][2];
extern IIdAtom * roundId;
extern IIdAtom * roundToId;
extern IIdAtom * roundupId;
extern IIdAtom * rowset2DatasetXId;
extern IIdAtom * rtlCopyRowLinkChildrenId;
extern IIdAtom * rtlDeserializeDictionaryId;
extern IIdAtom * rtlDeserializeDictionaryFromDatasetId;
extern IIdAtom * rtlDeserializeRowId;
extern IIdAtom * rtlDeserializeToBuilderId;
extern IIdAtom * rtlLinkChildrenId;
extern IIdAtom * rtlMaxId;
extern IIdAtom * rtlMinId;
extern IIdAtom * rtlRandomId;
extern IIdAtom * rtlSerializeDictionaryId;
extern IIdAtom * rtlSerializeDictionaryToDatasetId;
extern IIdAtom * rtlSerializeToBuilderId;
extern IIdAtom * searchTableInteger4Id;
extern IIdAtom * searchTableInteger8Id;
extern IIdAtom * searchTableUInteger4Id;
extern IIdAtom * searchTableUInteger8Id;
extern IIdAtom * searchUnicodeTableId;
extern IIdAtom * searchUtf8TableId;
extern IIdAtom * searchVUnicodeTableId;
extern IIdAtom * selectClusterId;
extern IIdAtom * serializeChildDictionaryToStreamId;
extern IIdAtom * serializeChildDictionaryToDatasetToStreamId;
extern IIdAtom * serializeChildRowsetToStreamId;
extern IIdAtom * serializeCStringXId;
extern IIdAtom * serializeDataXId;
extern IIdAtom * serializeDatasetXId;
extern IIdAtom * serializeGroupedDatasetXId;
extern IIdAtom * serializeStringXId;
extern IIdAtom * serializeBoolId;
extern IIdAtom * serializeDictionaryXId;
extern IIdAtom * serializeFixedDataId;
extern IIdAtom * serializeFixedStringId;
extern IIdAtom * serializeLPDataId;
extern IIdAtom * serializeLPQStringId;
extern IIdAtom * serializeLPStringId;
extern IIdAtom * serializeQStrXId;
extern IIdAtom * serializeRawId;
extern IIdAtom * serializeReal4Id;
extern IIdAtom * serializeReal8Id;
extern IIdAtom * serializeRowId;
extern IIdAtom * serializeRowsetXId;
extern IIdAtom * serializeGroupedRowsetXId;
extern IIdAtom * serializeSetId;
extern IIdAtom * serializeUnicodeXId;
extern IIdAtom * serializeUtf8XId;
extern IIdAtom * serializerPutId;
extern IIdAtom * serializerBeginNestedId;
extern IIdAtom * serializerEndNestedId;
extern IIdAtom * setConditionCodeId;
extern IIdAtom * setMethodId;
extern IIdAtom * setOwnMethodId;
extern IIdAtom * setPackedSignedId;
extern IIdAtom * setPackedUnsignedId;
extern IIdAtom * setResultBoolId;
extern IIdAtom * setResultDataId;
extern IIdAtom * setResultDatasetId;
extern IIdAtom * setResultDecimalId;
extern IIdAtom * setResultIntId;
extern IIdAtom * setResultQStringId;
extern IIdAtom * setResultRawId;
extern IIdAtom * setResultRealId;
extern IIdAtom * setResultSetId;
extern IIdAtom * setResultStringId;
extern IIdAtom * setResultUIntId;
extern IIdAtom * setResultUnicodeId;
extern IIdAtom * setResultVarStringId;
extern IIdAtom * setResultVarUnicodeId;
extern IIdAtom * setWorkflowConditionId;
extern IIdAtom * set2SetXId;
extern IIdAtom * sinId;
extern IIdAtom * sinhId;
extern IIdAtom * sqrtId;
extern IIdAtom * str2DataId;
extern IIdAtom * str2DataXId;
extern IIdAtom * strToQStrId;
extern IIdAtom * strToQStrXId;
extern IIdAtom * str2StrId;
extern IIdAtom * str2StrXId;
extern IIdAtom * str2VStrId;
extern IIdAtom * str2VStrXId;
extern IIdAtom * strcpyId;
extern IIdAtom * strlenId;
extern IIdAtom * subDataFTId;
extern IIdAtom * subDataFTXId;
extern IIdAtom * subDataFXId;
extern IIdAtom * subQStrFTId;
extern IIdAtom * subQStrFTXId;
extern IIdAtom * subQStrFXId;
extern IIdAtom * subStrFTId;
extern IIdAtom * subStrFTXId;
extern IIdAtom * subStrFXId;
extern IIdAtom * sysFailId;
extern IIdAtom * tanId;
extern IIdAtom * tanhId;
extern IIdAtom * trimAllId;
extern IIdAtom * trimBothId;
extern IIdAtom * trimLeftId;
extern IIdAtom * trimRightId;
extern IIdAtom * trimStrLenId;
extern IIdAtom * trimUnicodeAllId;
extern IIdAtom * trimUnicodeBothId;
extern IIdAtom * trimUnicodeLeftId;
extern IIdAtom * trimUnicodeRightId;
extern IIdAtom * trimUnicodeStrLenId;
extern IIdAtom * trimUtf8AllId;
extern IIdAtom * trimUtf8BothId;
extern IIdAtom * trimUtf8LeftId;
extern IIdAtom * trimUtf8RightId;
extern IIdAtom * trimUtf8StrLenId;
extern IIdAtom * trimVAllId;
extern IIdAtom * trimVBothId;
extern IIdAtom * trimVLeftId;
extern IIdAtom * trimVRightId;
extern IIdAtom * trimVStrLenId;
extern IIdAtom * trimVUnicodeAllId;
extern IIdAtom * trimVUnicodeBothId;
extern IIdAtom * trimVUnicodeLeftId;
extern IIdAtom * trimVUnicodeRightId;
extern IIdAtom * trimVUnicodeStrLenId;
extern IIdAtom * truncateId;
extern IIdAtom * UCharId;
extern IIdAtom * unicode2CodepageId;
extern IIdAtom * unicode2CodepageXId;
extern IIdAtom * unicode2DataId;
extern IIdAtom * unicode2DataXId;
extern IIdAtom * unicode2UnicodeId;
extern IIdAtom * unicode2UnicodeXId;
extern IIdAtom * unicodeToUtf8Id;
extern IIdAtom * unicodeToUtf8XId;
extern IIdAtom * unicode2VCodepageId;
extern IIdAtom * unicode2VCodepageXId;
extern IIdAtom * unicode2VUnicodeId;
extern IIdAtom * unicode2VUnicodeXId;
extern IIdAtom * unicodeNullTerminateId;
extern IIdAtom * unicodeStrcpyId;
extern IIdAtom * unicodeStrlenId;
extern IIdAtom * unicodeSubStrFXId;
extern IIdAtom * unicodeSubStrFTXId;
extern IIdAtom * utf82CodepageId;
extern IIdAtom * utf82CodepageXId;
extern IIdAtom * utf82DataId;
extern IIdAtom * utf82DataXId;
extern IIdAtom * utf82UnicodeId;
extern IIdAtom * utf82UnicodeXId;
extern IIdAtom * utf8ToUtf8Id;
extern IIdAtom * utf8ToUtf8XId;
extern IIdAtom * utf8LengthId;
extern IIdAtom * utf8SizeId;
extern IIdAtom * utf8SubStrFTXId;
extern IIdAtom * utf8SubStrFXId;
extern IIdAtom * validRealId;
extern IIdAtom * vcodepage2UnicodeId;
extern IIdAtom * vcodepage2UnicodeXId;
extern IIdAtom * vcodepage2VUnicodeId;
extern IIdAtom * vcodepage2VUnicodeXId;
extern IIdAtom * vn2bId;
extern IIdAtom * vn2fId;
extern IIdAtom * vn2l4Id;
extern IIdAtom * vn2l8Id;
extern IIdAtom * vn2ls4Id;
extern IIdAtom * vn2ls8Id;
extern IIdAtom * vstr2DataId;
extern IIdAtom * vstr2StrId;
extern IIdAtom * vstr2VStrId;
extern IIdAtom * vunicode2CodepageId;
extern IIdAtom * vunicode2CodepageXId;
extern IIdAtom * vunicode2DataId;
extern IIdAtom * vunicode2DataXId;
extern IIdAtom * vunicode2UnicodeId;
extern IIdAtom * vunicode2UnicodeXId;
extern IIdAtom * vunicode2VCodepageId;
extern IIdAtom * vunicode2VCodepageXId;
extern IIdAtom * vunicode2VUnicodeId;
extern IIdAtom * vunicode2VUnicodeXId;
extern IIdAtom * walkIndirectMetaMemberId;
extern IIdAtom * wregexFindXId;
extern IIdAtom * wregexGetFindStrId;
extern IIdAtom * wregexReplaceXId;
extern IIdAtom * writeEbcdicId;
extern IIdAtom * writeIntId[9];
extern IIdAtom * writeRealId;
extern IIdAtom * writeSignedId;
extern IIdAtom * writeStringId;
extern IIdAtom * writeUnicodeId;
extern IIdAtom * writeUnsignedId;
extern IIdAtom * writeUtf8Id;
extern IIdAtom * xmlDecodeStrId;
extern IIdAtom * xmlDecodeUStrId;
extern IIdAtom * xmlEncodeStrId;
extern IIdAtom * xmlEncodeUStrId;

#endif
