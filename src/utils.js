/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import countries from '../assets/countries.json';

const getEmojiFlag = ( countryCode ) =>
	String.fromCodePoint(
		...countryCode
			.toUpperCase()
			.split( '' )
			.map( ( char ) => 127397 + char.charCodeAt( 0 ) )
	);

const countriesOptions = Object.keys( countries ).map( ( code ) => ( {
	value: code,
	label: `${ getEmojiFlag( code ) } ${ countries[ code ] } - ${ code }`,
} ) );

const useFetchPosts = ( options ) =>
	useSelect(
		( select ) =>
			select( 'core' ).getEntityRecords( 'postType', 'post', options ),
		[ options ]
	);

const useCurrentPostId = () =>
	useSelect( ( select ) => select( 'core/editor' ).getCurrentPostId() );

export { countriesOptions };
export { getEmojiFlag };
export { useFetchPosts };
export { useCurrentPostId };
