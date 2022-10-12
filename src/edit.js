/**
 * WordPress dependencies
 */
import { edit, globe } from '@wordpress/icons';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import {
	ComboboxControl,
	Placeholder,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import countries from '../assets/countries.json';
import { countriesOptions, useCurrentPostId, useFetchPosts } from './utils';
import Preview from './preview';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();
	const { countryCode, relatedPosts } = attributes;
	const [ isPreview, setPreview ] = useState();
	const currentPostId = useCurrentPostId();

	const fetchedPosts = useFetchPosts( {
		search: countries[ countryCode ],
		exclude: [ currentPostId ],
	} );

	useEffect( () => setPreview( !! countryCode ), [ countryCode ] );

	const handleChangeCountry = () => setPreview( ( preview ) => ! preview );

	const handleChangeCountryCode = ( newCountryCode ) => {
		if ( newCountryCode && countryCode !== newCountryCode ) {
			setAttributes( {
				countryCode: newCountryCode,
				relatedPosts: [],
			} );
		}
	};

	useEffect( () => {
		setAttributes( {
			relatedPosts:
				fetchedPosts?.map( ( relatedPost ) => ( {
					...relatedPost,
					title: relatedPost.title?.raw || relatedPost.link,
					excerpt: relatedPost.excerpt?.raw || '',
				} ) ) || [],
		} );
	}, [ fetchedPosts, setAttributes ] );

	return (
		<div { ...blockProps }>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={ __( 'Change Country', 'xwp-country-card' ) }
						icon={ edit }
						onClick={ handleChangeCountry }
						disabled={ ! countryCode }
					/>
				</ToolbarGroup>
			</BlockControls>
			{ isPreview ? (
				<Preview
					countryCode={ countryCode }
					relatedPosts={ relatedPosts }
				/>
			) : (
				<Placeholder
					icon={ globe }
					label={ __( 'XWP Country Card', 'xwp-country-card' ) }
					isColumnLayout={ true }
					instructions={ __(
						'Type in a name of a country you want to display on you site.',
						'xwp-country-card'
					) }
				>
					<ComboboxControl
						label={ __( 'Country', 'xwp-country-card' ) }
						hideLabelFromVision
						options={ countriesOptions }
						value={ countryCode }
						onChange={ handleChangeCountryCode }
						allowReset={ true }
					/>
				</Placeholder>
			) }
		</div>
	);
}
